import Metalog from '#models/webhooklog'
import { Job } from 'bullmq'
import { getID } from '../utils/index.js'
import { Meta } from '#queue/metagen-queue'

export class WebhookLog {
  constructor() {}

  async saveLog(job: Job<Meta>, userId: number) {
    const metaData = job.data

    console.log({ metaData })
    const log = await Metalog.create({
      metaId: Number(job.id),
      id: getID(),
    })

    return {
      data: log,
      error: null,
    }
  }
}
