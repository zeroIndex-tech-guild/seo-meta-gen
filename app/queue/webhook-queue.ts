import { Queue, Worker, Job } from 'bullmq'
import { connection } from './connection.js'
import { Meta } from '#sharedTypes/meta'
import axios from 'axios'

export const WEBHOOK_QUEUE = 'webhook-queue'

type Props = {
  webHookUrl: string
  jobId: string
  content: string
  metaTags: Meta
}

export class WebhookQueue {
  protected webhookQueue: Queue
  protected worker: Worker

  constructor() {
    //@ts-ignore
    this.webhookQueue = new Queue(WEBHOOK_QUEUE, { connection })

    this.worker = new Worker(
      WEBHOOK_QUEUE,
      async (job: Job) => {
        await this.handleJob(job)
      },

      //@ts-ignore
      { connection, attempts: 5, backoff: { type: 'exponential', delay: 5000 } }
    )

    this.handleJobComplete()
  }

  async addJob(props: Props) {
    try {
      const job = this.webhookQueue.add(WEBHOOK_QUEUE, props)
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

  async handleJob(props: Job<Props>) {
    const {
      data: { webHookUrl, ...rest },
    } = props

    console.log({ webHookUrl, rest })
    await axios.post(webHookUrl, rest)
  }

  async handleJobComplete() {
    this.worker.on('completed', (job: Job<Props>) => {
      console.log('Job completed:', job.data)
    })
  }
}
