import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Meta } from '#sharedtypes'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSeoTags(meta: Meta) {
  const { title, description, keywords, OpenGraph, TwitterCard, JSONLD, canonicalUrl } = meta

  // OpenGraph tags
  const ogTags = Object.entries(OpenGraph)
    .map(([key, value]) => `<meta property="og:${key}" content="${value}" />`)
    .join('\n')

  // TwitterCard tags
  const twitterTags = Object.entries(TwitterCard)
    .map(([key, value]) => `<meta name="twitter:${key}" content="${value}" />`)
    .join('\n')

  // JSONLD script
  const jsonld = `<script type="application/ld+json">
  ${JSON.stringify(JSONLD, null, 2)}
  </script>`

  // Meta tags for title, description, keywords, and canonical URL
  const metaTags = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${keywords.join(', ')}" />
    <link rel="canonical" href="${canonicalUrl}" />
    ${ogTags}
    ${twitterTags}
    ${jsonld}
  `

  return metaTags
}
