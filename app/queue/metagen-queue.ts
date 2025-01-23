import MetaGen from '#services/meta-gen'
import { inject } from '@adonisjs/core'
import { Job, Queue, Worker } from 'bullmq'
import { connection } from './connection.js'
import { GENERATED_FOR } from '#sharedTypes/enums/index'
import { MetaGenProcessor } from '../processors/metagen-processor.js'
import { Meta } from '#sharedTypes/meta'

export const META_QUEUE = 'meta-queue'

export type MetaForUI = {
  for: GENERATED_FOR.UI
  content: string
  meta?: Meta
}

export type MetaForWebhook = {
  for: GENERATED_FOR.WEBHOOK
  content: string
  webhook: {
    secret: string
  }
  meta?: Meta
}

export type MetaGenProps = MetaForUI | MetaForWebhook

@inject()
export class MetaQueue {
  protected metaQueue: Queue
  protected worker: Worker

  constructor(
    protected metaGen: MetaGen,
    protected meteGenProcessor: MetaGenProcessor
  ) {
    //@ts-ignore
    this.metaQueue = new Queue(META_QUEUE, { connection })
    this.worker = new Worker(
      META_QUEUE,
      async (job: Job<MetaGenProps>) => {
        await this.handleJob(job)
      },

      //@ts-ignore
      { connection }
    )

    this.handleJobComplete()
  }

  async addJob(props: MetaGenProps) {
    try {
      const job = await this.metaQueue.add(META_QUEUE, props)
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

  async handleJob(props: Job<MetaGenProps>) {
    const data = props.data
    const { data: meta, error } = await this.meteGenProcessor.process(data)

    if (error !== null) {
      return
    }
    props.data.meta = meta
  }

  async handleJobComplete() {
    this.worker.on('completed', async (job: Job<MetaGenProps>) => {
      this.meteGenProcessor.onJobCompleted(job.data)
    })
  }

  //async handleJobComplete() {
  //  this.worker.on('completed', async (job: Job<Meta>) => {
  //    const { trigger = false, secret = '' } = job.data.webhook || {}
  //
  //    //await MetaGens.create({
  //    //  id: getID(),
  //    //  meta: job.data.metaTags,
  //    //  userId: 1,
  //    //})
  //
  //    if (trigger) {
  //      await this.handleWebhookTrigger(secret, job)
  //    } else {
  //      await this.handleSocketTrigger(job)
  //    }
  //  })
  //}

  //async handleSocketTrigger(job: Job<Meta>) {
  //  socket.io!.emit('meta-job-completed', {
  //    data: {
  //      content: job.data.content,
  //      metaTags: job.data.metaTags,
  //    },
  //    error: null,
  //    message: 'Finished generating meta tags',
  //  })
  //}

  //async handleWebhookTrigger(secret: string, job: Job<Meta>) {
  //  const { data: webhookSecret, error: secretError } = await this.getWebhookSecrets(secret)
  //
  //  if (secretError !== null) {
  //    // handle error
  //    return
  //  }
  //
  //  const { data: url, error: webhookUrlError } = await this.getWebHookUrl(webhookSecret.userId)
  //
  //  if (webhookUrlError !== null) {
  //    // handle error
  //    return
  //  }
  //
  //  await this.triggerWebhook(url.url, job)
  //}

  //async getWebhookSecrets(secretKey: string) {
  //  try {
  //    const secrets = await WebhookSecrets.query()
  //      .where('secretKey', secretKey)
  //      .where('isActive', true)
  //      .preload('user')
  //      .firstOrFail()
  //
  //    return {
  //      data: secrets,
  //      error: null,
  //    }
  //  } catch (e) {
  //    return {
  //      data: null,
  //      error: e as Error,
  //    }
  //  }
  //}

  //async getWebHookUrl(userId: number) {
  //  try {
  //    const webhookUrl = await WebhookUrl.query()
  //      .where('userId', userId)
  //      .where('isActive', true)
  //      .firstOrFail()
  //
  //    return {
  //      data: webhookUrl!,
  //      error: null,
  //    }
  //  } catch (e) {
  //    return {
  //      data: null,
  //      error: e as Error,
  //    }
  //  }
  //}

  //async triggerWebhook(url: string, job: Job<Meta>) {
  //  console.log('trigger webhook')
  //  try {
  //    const response = await axios({
  //      method: 'post',
  //      url,
  //      headers: {
  //        'Content-Type': 'application/json',
  //      },
  //      data: {
  //        content: job.data.content,
  //        metaTags: job.data.metaTags,
  //      },
  //    })
  //
  //    const success = response.status === 200
  //
  //    if (!success) {
  //      console.log({ response }, 'web hook failed')
  //      // web hook job failed
  //    }
  //
  //    await this.webhookLog.saveLog(job, 1)
  //  } catch (e) {
  //    console.log({ e })
  //  }
  //}
}
