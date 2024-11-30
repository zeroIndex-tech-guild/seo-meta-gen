import { GoogleGenerativeAI } from '@google/generative-ai'
import env from '#start/env'

export default class AiModels {
  private apiKey: string
  private genAI: GoogleGenerativeAI

  constructor() {
    this.apiKey = env.get('GEMINI_API_KEY')
    this.genAI = new GoogleGenerativeAI(this.apiKey)
  }

  flashModel() {
    return this.genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' },
    })
  }
}
