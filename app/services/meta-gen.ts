import { inject } from '@adonisjs/core'
import { removeStopwords } from 'stopword'
import { PROMPT_TEMPLATE } from '../constants/promt-template.js'
import AiModels from './ai-models.js'
import { CreateMetaGenValues } from '#validators/meta-gen'

@inject()
export default class MetaGen {
  constructor(protected aiModels: AiModels) {}

  async generateTag(props: CreateMetaGenValues) {
    try {
      const contentArray = removeStopwords(props.content.split(' '))
      const content = contentArray.join(' ')
      const prompt = PROMPT_TEMPLATE.replace('%content%', content)
      const result = await this.aiModels.flashModel().generateContent(prompt)
      const response = result.response

      const data = JSON.parse(response.text())

      console.log(data, 'thisi is data')
      return {
        data: {
          meta: data,
        },
        error: null,
      }
    } catch (e) {
      return {
        data: null,
        error: {
          message: (e as Error).message,
        },
      }
    }
  }
}
