import MetaGen from '#services/meta-gen'
import { inject } from '@adonisjs/core'
import { Job, Queue, Worker } from 'bullmq'
import socket from '#services/socket'
import { connection } from './connection.js'
import WebhookSecrets from '#models/webhook-secret'
import WebhookUrl from '#models/webhook-urls'
import axios from 'axios'

export const META_QUEUE = 'meta-queue'

type Meta = {
  content: string
  metaTags?: string
  webhook?: {
    trigger: true
    secret: string
  }
}

@inject()
export class MetaQueue {
  protected metaQueue: Queue
  protected worker: Worker

  constructor(
    protected metaGen: MetaGen,
    protected webhookSecret: WebhookSecrets,
    protected webhookUrls: WebhookUrl
  ) {
    //@ts-ignore
    this.metaQueue = new Queue(META_QUEUE, { connection })
    this.worker = new Worker(
      META_QUEUE,
      async (job: Job<Meta>) => {
        await this.handleJob(job)
      },

      //@ts-ignore
      { connection }
    )

    // Set up the event listener for job completion in the constructor
    this.handleJobComplete()
  }

  async addJob(props: Meta) {
    try {
      const job = this.metaQueue.add(META_QUEUE, props)
      return {
        data: job,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error,
      }
    }
  }

  async handleJob(props: Job<Meta>) {
    const { data } = await this.metaGen.generateTag({ content: props.data.content })
    props.data.metaTags = data?.meta
  }

  async handleJobComplete() {
    this.worker.on('completed', async (job: Job<Meta>) => {
      const { trigger = false, secret = '' } = job.data.webhook || {}

      if (trigger) {
        await this.handleWebhookTrigger(secret, job)
      } else {
        await this.handleSocketTrigger(job)
      }
    })
  }

  async handleSocketTrigger(job: Job<Meta>) {
    socket.io!.emit('meta-job-completed', {
      data: {
        content: job.data.content,
        metaTags: job.data.metaTags,
      },
      error: null,
      message: 'Finished generating meta tags',
    })
  }

  async handleWebhookTrigger(secret: string, job: Job<Meta>) {
    const { data: webhookSecret, error: secretError } = await this.getWebhookSecrets(secret)

    if (secretError !== null) {
      // handle error
      return
    }

    const { data: url, error: webhookUrlError } = await this.getWebHookUrl(webhookSecret.userId)

    if (webhookUrlError !== null) {
      // handle error
      return
    }

    await this.triggerWebhook(url.url, job)
  }

  async getWebhookSecrets(secretKey: string) {
    try {
      const secrets = await WebhookSecrets.query()
        .where('secretKey', secretKey)
        .where('isActive', true)
        .preload('user')
        .firstOrFail()

      return {
        data: secrets,
        error: null,
      }
    } catch (e) {
      return {
        data: null,
        error: e as Error,
      }
    }
  }

  async getWebHookUrl(userId: number) {
    try {
      const webhookUrl = await WebhookUrl.query()
        .where('userId', userId)
        .where('isActive', true)
        .firstOrFail()

      return {
        data: webhookUrl!,
        error: null,
      }
    } catch (e) {
      return {
        data: null,
        error: e as Error,
      }
    }
  }

  async triggerWebhook(url: string, job: Job<Meta>) {
    try {
      const response = await axios({
        method: 'post',
        url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          content: job.data.content,
          metaTags: job.data.metaTags,
        },
      })

      const success = response.status === 200

      if (!success) {
        console.log({ response }, 'web hook failed')
        // web hook job failed
      }
    } catch (e) {
      console.log({ e })
    }
  }
}
