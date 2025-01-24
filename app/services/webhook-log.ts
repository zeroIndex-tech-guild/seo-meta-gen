import { Meta } from '#sharedTypes/meta'
import { Job } from 'bullmq'

export class WebhookLog {
  constructor() {}

  async saveLog(job: Job<Meta>, userId: number) {
    return { job, userId }
  }
}
