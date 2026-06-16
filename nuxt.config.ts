// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  // 载入全局 css
  css: ['~/assets/css/style.css', '~/assets/css/anim.css'],

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', href: 'https://www.mihoyo.com/favicon.ico' },
      ],
      title: '米哈游-TECH OTAKUS SAVE THE WORLD',
      script: [
        { src: 'https://hm.baidu.com/hm.js?0f4bc81eb22a23afd6aa4a27c2fc91ee' },
      ],
    },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  nitro: {
    prerender: { crawlLinks: false, routes: [] },
  },

  devtools: { enabled: true },
})