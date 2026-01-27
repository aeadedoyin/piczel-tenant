export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const appUrl = config.public.appUrl || 'https://piczel.app'

  const title = 'Piczel'
  const description = 'Professional photo gallery management for photographers. Organize, share, and deliver stunning photos to your clients.'

  useSeoMeta({
    title,
    description,
    ogType: 'website',
    ogSiteName: title,
    ogTitle: title,
    ogDescription: description,
    ogImage: `${appUrl}/og-image.jpg`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: `${appUrl}/og-image.jpg`,
  })
})
