import { MetadataRoute } from 'next'
import { COUNTIES } from './site-check/permit-data'
import { SIZES } from './metal-buildings/size-data'
import { GUIDES } from './guides/guides-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aaireco.com'

  const countyPages: MetadataRoute.Sitemap = COUNTIES.map((c) => ({
    url: `${baseUrl}/site-check/${c.state.toLowerCase()}/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const sizePages: MetadataRoute.Sitemap = SIZES.map((s) => ({
    url: `${baseUrl}/metal-buildings/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const guidePages: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${baseUrl}/guides/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...countyPages,
    ...sizePages,
    ...guidePages,
    {
      url: `${baseUrl}/metal-buildings`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/construction`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/build-process`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/why-web-truss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/site-check`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/configure`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/hawaii`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
