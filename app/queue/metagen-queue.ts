import emitter from '@adonisjs/core/services/emitter'
import MetaGen from '#services/meta-gen'
import { inject } from '@adonisjs/core'
import redis from '@adonisjs/redis/services/main'
import { Job, Queue, Worker } from 'bullmq'

export const META_QUEUE = 'meta-queue'

const connection = redis.connection('main')

type MetaJob = {
  content: string
}

@inject()
export class MetaQueue {
  protected metaQueue: Queue
  protected worker: Worker

  constructor(protected metaGen: MetaGen) {
    //@ts-ignore
    this.metaQueue = new Queue(META_QUEUE, { connection })
    this.worker = new Worker(
      META_QUEUE,
      async (job: Job<MetaJob>) => {
        await this.handleJob(job)
      },

      //@ts-ignore
      { connection }
    )
  }

  async addJob(props: { content: string }) {
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

  async handleJob(props: Job<MetaJob>) {
    const { data, error } = await this.metaGen.generateTag({ content: props.data.content })
    console.log('******', data, error)
  }

  async handleJobComplete() {
    this.worker.on('completed', (job: Job<MetaJob>) => {
      console.log('completed', job.data)
    })
    //await this.worker.waitUntilReady()
  }
}
