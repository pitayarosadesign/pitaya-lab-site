/**
 * 🌿 PITAYA LAB — SEO editable por página
 * =========================================
 * Aplica SEO a una ruta usando el override guardado en `site_config.page_seo`
 * (un mapa { '/ruta': { title, description, ogTitle, ogDescription, robots } })
 * y, si no hay override para esa ruta, usa los defaults de la página.
 *
 * Uso:
 *   usePageSeo('/about', {
 *     title: 'Sobre Nosotros | PITAYA LAB',
 *     description: '...',
 *     ogTitle: '...',
 *     ogDescription: '...',
 *   })
 */
export interface PageSeoDefaults {
  title?: string
  description?: string
  ogTitle?: string
  ogDescription?: string
  robots?: string
}

export function usePageSeo(path: string, defaults: PageSeoDefaults = {}) {
  const { data } = useFetch('/api/site/seo', {
    default: () => ({ value: null }),
  })

  const meta = computed(() => {
    const map = (data.value?.value as Record<string, PageSeoDefaults> | null) || {}
    const override = map[path] || {}
    const pick = (key: keyof PageSeoDefaults) => override[key] || defaults[key] || undefined
    return {
      title: pick('title'),
      description: pick('description'),
      ogTitle: pick('ogTitle'),
      ogDescription: pick('ogDescription'),
      robots: pick('robots'),
    }
  })

  useSeoMeta({
    title: () => meta.value.title,
    description: () => meta.value.description,
    ogTitle: () => meta.value.ogTitle,
    ogDescription: () => meta.value.ogDescription,
    robots: () => meta.value.robots,
  })

  return meta
}
