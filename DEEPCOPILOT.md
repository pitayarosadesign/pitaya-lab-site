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

## Envía Fulfillment (3PL)

### Datos clave
- Base API: `https://apifulfillment.envia.com` (sandbox: `https://fulfillment-api-test.envia.com`).
- Auth: `Authorization: Bearer <token>` en todas las rutas.
- `companyId 16466`, `warehouseId 324`, `shopId 4060` (Pitaya Lab, MXN).
- Las rutas de fulfillment llevan prefijo `/company/{companyId}`.

### Cliente helper
- `apps/store/server/utils/enviaFulfillment.ts` → `enviaFulfillmentFetch`, `getEnviaFulfillmentCompanyId`, `getEnviaFulfillmentWarehouseId`, `createEnviaFulfillmentOrder`, `fetchEnviaFulfillmentInventoryRaw`.
- `companyId`/`warehouseId` salen del runtimeConfig si están, si no de `GET /auth/me`.

### Sync de stock + mapeo SKU → variantId
- `apps/store/server/api/shipping/envia-fulfillment-sync.post.ts` → `POST /api/shipping/envia-fulfillment-sync`.
- Consulta `GET /company/{id}/warehouse/inventory`, empareja por SKU (exacto y normalizado) contra `product_variants` y `products`, y escribe `envia_variant_id` **y** `stock` (el `available` de Envía).
- Respuesta del inventario: `{ totalRows, products: [{ productId, variantId, sku, name, warehouses: [{ warehouseId, quantity, available, shrinkageQuantity }] }] }`.
- El sync es manual. Para tiempo real existe el webhook `onInventoryModification` (ver abajo).

### Creación de orden en Envía al confirmar pago
- `apps/store/server/api/checkout/webhook.post.ts` (evento `checkout.session.completed` de Stripe).
- Helper `createEnviaFulfillmentForOrder` resuelve `envia_variant_id` por producto/variante y arma el payload de `POST /company/{id}/client/order/create`.
- Routing: **solo** se envían los productos con `envia_variant_id`; los recuerdos (hechos a mano, sin variantId) se excluyen automáticamente.
- Idempotencia: se anota `Envía Fulfillment: orden XXXX creada` (o `ERROR`) en `orders.admin_notes`; los reintentos de Stripe no duplican.
- Payload de `order/create`: `warehouseId, orderIdentifier (PIT-XXXX), ecommerceStatus, total, currency, email, products[{ variantId, quantity, price, discount }], shippingAddress (firstName/lastName/address1/district/city/state{code,name}/country{code,name}/postalCode/phone/references)`.
- `apps/store/stores/cart.ts` → `getCheckoutItems()` debe incluir `id` y `variantId` (se corrigió); sin eso el webhook no resuelve nada.

### Webhooks de Envía (registrados con URLs distintas)
Envía registra **un webhook por URL**; por eso hay una ruta por evento:

| Evento | URL | Endpoint | Estado |
|---|---|---|---|
| `onOrderUpdate` | `/api/shipping/envia-fulfillment-webhook` | `.../envia-fulfillment-webhook.post.ts` | stub (loguea) |
| `onOrderDelete` | `/api/shipping/envia-fulfillment-webhook-delete` | `...-delete.post.ts` | stub (loguea) |
| `onInventoryModification` | `/api/shipping/envia-fulfillment-webhook-inventory` | `...-inventory.post.ts` | implementado (parseo defensivo + log) |

- `onInventoryModification` actualiza `stock` por SKU o `envia_variant_id`; SIEMPRE loguea el payload crudo para afinar el contrato.
- `onOrderUpdate`/`onOrderDelete` quedan como stubs hasta capturar el payload real de la primera venta.

### Variables de entorno (Vercel, proyecto tienda)
- `ENVIA_FULFILLMENT_TOKEN` (secreto, Bearer). Requerido.
- `ENVIA_FULFILLMENT_API_BASE` (default `https://apifulfillment.envia.com`).
- `ENVIA_FULFILLMENT_COMPANY_ID`, `ENVIA_FULFILLMENT_WAREHOUSE_ID`, `ENVIA_FULFILLMENT_SHOP_ID` (opcionales, overrides).

### Pendiente
- Alinear 3 SKUs con Envía: `BR-KIYO225`, `AC-SANT15`, `BR-PALO225` (no sincronizan stock ni se crean órdenes hasta coincidir).
- Implementar `onOrderUpdate`/`onOrderDelete` cuando llegue el primer payload real (primera venta).
- Envía.com **tracking** (guías de paquetería) es OTRO producto distinto: endpoint `POST /api/shipping/envia-webhook` (`apps/store/server/api/shipping/envia-webhook.post.ts`).
