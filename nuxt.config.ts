// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      htmlAttrs: { lang: 'es' },
      title: 'Payet | Administrador de finanzas',
      meta: [
        { name: 'description', content: 'Administrador de finanzas' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { property: 'og:title', content: 'Payet | Administrador de finanzas' },
        { property: 'og:description', content: 'Administrador de finanzas' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://payet.ecostudios.dev/' },
        { property: 'og:site_name', content: 'Payet' },
        { property: 'og:locale', content: 'es_MX' },
        { name: 'twitter:card', content: 'summary' },
      ],
      link: [{ rel: 'canonical', href: 'https://payet.ecostudios.dev/' }],
      script: [{
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          '@id': 'https://payet.ecostudios.dev/#app',
          name: 'Payet',
          description: 'Administrador de finanzas',
          url: 'https://payet.ecostudios.dev/',
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'Web browser',
          inLanguage: 'es',
        }),
      }],
    },
  },
  modules: ["@nuxt/ui"]
})
