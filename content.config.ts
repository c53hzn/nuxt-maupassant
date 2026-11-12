import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod' // or 'zod/v3' if your setup exposes this subpath

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: 
        z.object({
          slug: z.string(),
          tags: z.array(z.string()).default([]),
          categories: z.array(z.string()).default([]),
        }),
    }),
    landingpage: defineCollection({
      type: 'page',
      source: 'landingpage/*.md',
      schema: 
        z.object({
          slug: z.string(),
        }),
    }),
    settings: defineCollection({
      type: 'data', // 关键：表明这是单文件数据，而非页面集合
      source: 'settings.yml', // 精确指向单个文件
      schema: z.object({
        author_name: z.string(),
        site_name: z.string(),
        site_description: z.string(),
        prevNextIsExcludeDate: z.boolean(),
        perPage: z.number(),
        navLinks: z.array(z.object({
          path: z.string(),
          title: z.string(),
          target: z.string(),
          fa_class: z.string(),
        })),
        friendSites: z.array(z.object({
          href: z.string(),
          text: z.string(),
        })),
        footer: z.array(z.object({
          text: z.string(),
          link: z.object({
            text: z.string(),
            href: z.string(),
            fa_class: z.string(),
          }),
        })),
      })
    }),
  },
})
