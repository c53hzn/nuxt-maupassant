// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    baseURL: '/nuxt-maupassant/',//默认是 '/'
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Nuxt.js project' }
      ],
    },
  },
  modules: ['@nuxt/content'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
