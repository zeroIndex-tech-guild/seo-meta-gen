import MetaGen from '#services/meta-gen'
import { inject } from '@adonisjs/core'
import redis from '@adonisjs/redis/services/main'
import { Job, Queue, Worker } from 'bullmq'
import socket from '#services/socket'

export const META_QUEUE = 'meta-queue'

const connection = redis.connection('main')

type MetaJob = {
  content: string
  metaTags?: string
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

    // Set up the event listener for job completion in the constructor
    this.handleJobComplete()
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
    const { data } = await this.metaGen.generateTag({ content: props.data.content })
    props.data.metaTags = data?.meta
  }

  // Set up the job completion event listener
  async handleJobComplete() {
    this.worker.on('completed', (job: Job<MetaJob>) => {
      socket.io!.emit('meta-job-completed', {
        data: {
          content: job.data.content,
          metaTags: job.data.metaTags,
        },
        error: null,
        message: 'Finished generating meta tags',
      })
    })
  }
}
