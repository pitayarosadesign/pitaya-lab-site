/**
 * 🌿 PITAYA LAB - Configuración del sitio (fuente única de verdad)
 * =================================================================
 * Centraliza la carga de `site_config` de Supabase para que NavBar,
 * Footer y cualquier otro componente lean los mismos datos con UNA
 * sola consulta (antes cada componente hacía su propia consulta).
 *
 * Los valores por defecto viven en `utils/siteDefaults.ts` y solo
 * aplican si Supabase no responde o no tiene el registro esperado.
 */

import { defaultBrand, defaultContact, defaultFooter, defaultNavLinks, defaultShipping, defaultShippingBar } from '~/utils/siteDefaults'

export const useSiteConfigStore = defineStore('siteConfig', () => {
  // 🚚 Barra de envíos (configurable: site_config.shipping_bar)
  const shippingBar = reactive({ ...defaultShippingBar })

  // 🚚 Reglas de envío (umbrales y costo): site_config.shipping
  const shipping = reactive({ ...defaultShipping })

  // 🏷️ Marca (logo, nombre, eslogan): site_config.brand
  const brand = reactive({ ...defaultBrand })

  // 🦶 Footer (descripción y enlaces): site_config.footer
  const footer = reactive({ ...defaultFooter })

  // 📞 Contacto (email, teléfono, WhatsApp): site_config.contact
  const contact = reactive({ ...defaultContact })

  // 🧭 Enlaces del menú: site_config.nav_links
  const navLinks = ref(defaultNavLinks.map(link => ({ ...link })))

  const loaded = ref(false)
  let pending: Promise<void> | null = null

  async function fetchConfig() {
    // Ya cargado o petición en curso → no duplicar consultas.
    if (loaded.value) return
    if (pending) return pending

    pending = (async () => {
      if (!import.meta.client) return
      try {
        const supabase = useNuxtApp().$supabase
        if (!supabase) return
        const { data } = await supabase.from('site_config').select('key, value')
        const rows = Array.isArray(data) ? data : []
        const byKey = (key: string) => rows.find(r => r.key === key)?.value

        const sb = byKey('shipping_bar')
        if (sb) Object.assign(shippingBar, sb)

        const sh = byKey('shipping')
        if (sh) Object.assign(shipping, sh)

        const br = byKey('brand')
        if (br) Object.assign(brand, br)

        const ft = byKey('footer')
        if (ft) Object.assign(footer, ft)

        const ct = byKey('contact')
        if (ct) Object.assign(contact, ct)

        const nv = byKey('nav_links')
        if (Array.isArray(nv) && nv.length) {
          navLinks.value = nv.map((link: any) => ({ ...link }))
        }

        loaded.value = true
      } catch (e) {
        console.warn('Usando valores por defecto de configuración del sitio')
      }
    })().finally(() => { pending = null })

    return pending
  }

  return { shippingBar, shipping, brand, footer, contact, navLinks, loaded, fetchConfig }
})
