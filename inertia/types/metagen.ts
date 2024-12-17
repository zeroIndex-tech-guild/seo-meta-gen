import { ServerResponse } from '#sharedtypes'

export interface Meta {
  title: string
  description: string
  keywords: string[]
  OpenGraph: {
    'og:title': string
    'og:description': string
    'og:image': string
    'og:url': string
  }
  TwitterCard: {
    'twitter:card': string
    'twitter:title': string
    'twitter:description': string
    'twitter:image': string
  }
  JSONLD: {
    '@context': string
    '@type': string
    'headline': string
    'description': string
    'image': string
    'author': {
      '@type': string
      'name': string
      'url'?: string
    }
    'publisher': {
      '@type': string
      'name': string
      'logo': {
        '@type': string
        'url': string
      }
    }
    'datePublished': string
  }
  canonicalUrl: string
}

export type GenerateMetaResponse = ServerResponse<Meta>
