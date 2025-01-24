import UserApp from '#models/user_app'
import { MetaForWebhook, MetaGenProps } from '#queue/metagen-queue'
import MetaGen from '#services/meta-gen'
import socket from '#services/socket'
import { GENERATED_FOR } from '#sharedTypes/enums/index'
import { inject } from '@adonisjs/core'
import axios from 'axios'

@inject()
export class MetaGenProcessor {
  constructor(protected metaGen: MetaGen) {}

  async process(props: MetaGenProps) {
    const { content } = props
    const { data, error } = await this.metaGen.generateTag({
      content,
    })

    if (error !== null) {
      return {
        data: null,
        error,
      }
    }

    return {
      data,
      error: null,
    }
  }

  async onJobCompleted(props: MetaGenProps) {
    const { for: generatedFor } = props
    console.log('job completed:', props)

    if (generatedFor === GENERATED_FOR.UI) {
      this.triggerWebsocket(props)
    }

    if (generatedFor === GENERATED_FOR.WEBHOOK) {
      this.triggerWebhook(props)
    }
  }

  async triggerWebsocket(props: MetaGenProps) {
    socket.io!.emit('meta-job-completed', {
      data: {
        content: props.content,
        metaTags: props.meta,
      },
      error: null,
      message: 'Finished generating meta tags',
    })
  }

  async triggerWebhook(props: MetaForWebhook) {
    console.log('trigger webook...')
    const userApp = await UserApp.query()
      .preload('webhookUrls')
      .where('secret', props.webhook.secret)
      .first()

    const webHookUrls = userApp?.webhookUrls || []

    for (const url of webHookUrls) {
      try {
        const response = await axios.post(url.url, props)
        console.log({ response })
      } catch (e) {
        console.log({ e })
      }
    }
  }
}
