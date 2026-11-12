# PITAYA LAB — Proyecto (DEEPCOPILOT)

Notas de arquitectura e integraciones para referencia en futuras sesiones.

## Meta Pixel + API de Conversiones (CAPI)

### Datos clave
- Pixel ID: `1031196445800113`
- Catálogo (anuncios dinámicos): `Catálogo_Productos`, ID `1066534639454833`
- Dominio correcto: `pitayalab.com.mx` (el viejo `pitayarosadesign.com` ya no se usa)

### Código base (píxel del navegador)
- Vive en `apps/store/nuxt.config.ts` → `app.head.script` + `app.head.noscript`.
- Se inyecta en el `<head>` de todas las páginas (SSR, primer render).
- El ID numérico sale de `process.env.NUXT_PUBLIC_FB_PIXEL_ID` con fallback `1031196445800113`.
- No está en `app.vue`: se movió a `nuxt.config.ts` para garantizar head global y evitar duplicados.

### Eventos (navegador + CAPI)
Helper central: `apps/store/composables/useFbPixel.ts` → `trackFbEvent(name, params, userData?)`.
- Dispara `fbq('track', ...)` en el navegador Y reenvía a CAPI con el mismo `event_id` (dedupe).
- `userData.email` / `userData.phone` se hashean con SHA-256 (`em`/`ph`) usando `crypto.subtle` en el cliente.

Eventos cableados:
| Evento | Archivo | Notas |
|---|---|---|
| `ViewContent` | `pages/product/[slug].vue` | watch sobre `product` |
| `AddToCart` | `stores/cart.ts` → `addItem` | usa `item.sku \|\| item.id` |
| `InitiateCheckout` | `pages/checkout/index.vue` → `onMounted` | incluye `em`/`ph` del form |
| `Purchase` | `pages/checkout/success.vue` → `onMounted` | incluye `em`/`ph` de la sesión; lee el total antes de limpiar el carrito |

### API de conversiones (server-to-server)
- Endpoint: `apps/store/server/api/meta/capi.post.ts` → `POST /api/meta/capi`.
- Reenvía a `https://graph.facebook.com/v21.0/{pixel_id}/events`.
- Añade `client_ip_address` (x-forwarded-for → x-real-ip → socket) y `client_user_agent`.
- Acepta `fbp`, `fbc`, `em`, `ph` del cliente (whitelist).
- El token solo vive en el servidor: `runtimeConfig.metaCapiToken`.

### content_ids (IMPORTANTE para anuncios dinámicos)
- Deben coincidir con el `id` del feed del catálogo: `/api/meta/catalog.json` usa `id: product.sku || product.id`.
- Por eso todos los eventos mandan `content_ids: [sku || id]`.
- Si se agrega un evento nuevo, usar siempre `sku || id` (no el `id` solo).

### Variables de entorno
- `FACEBOOK_PIXEL_ID` (o `META_CAPI_ACCESS_TOKEN`): **token de acceso CAPI** (secreto, empieza con `EAA…`). Solo servidor. Requerido en Vercel (proyecto tienda).
- `NUXT_PUBLIC_FB_PIXEL_ID`: opcional, override del ID numérico (default `1031196445800113`).
- En Vercel: Settings → Environment Variables. `.env` local solo aplica en desarrollo.

### Cómo probar
1. Events Manager → **Probar eventos (Test Events)** → copiar `test_event_code`.
2. O navegar el sitio (ver producto → agregar → checkout) y revisar que aparezcan eventos con origen **Servidor**.
3. El `test_event_code` nunca va en eventos de producción (nuestro endpoint no lo envía).

### Estado
- ✅ Píxel base en head, eventos de conversión, CAPI, `content_ids` alineados, `em`/`ph` hasheados.
- ⏳ Pendiente (opcional): nada. Dataset Quality se consulta desde el panel de Meta.
