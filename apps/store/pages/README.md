# ✳️ Páginas del store (apps/store/pages)

Documentación breve de mantenimiento por página. Si un archivo tiene su propia
nota inline (en su cabecera `<template>`), esa nota es la fuente autoritativa.

| Alias del grupo | Archivo | Qué hacer / mantener |
|---|---|---|
| **Catálogo** | `catalog.vue` | Ver *«Catálogo — constancia de filtros»* abajo. |
| Producto | `product/[slug].vue` | Detalle y variantes; depende del modelo `products`. |
| Colecciones | ... | Páginas de colección. |
| B2B | `b2b/*` | Cotizadores mayoreo/recuerdos; pricing en `composables/useB2B.ts`. |
| Checkout | `checkout/*` | Flujo Stripe (sesión y webhook en `server/api`). |
| Resto (about, faq, privacy…) | ... | Contenido llano / configurado desde `site_config`. |

> El repo sigue el esquema de guías por directorio (`.continue/rules/*`): para
> detalle global lee la **guía raíz `AGENTS/…` / `continue.config`** del proyecto.)

---

## Catálogo — constancia de filtros (🚨 léelo antes de “refactorizar”)

Los filtros del catálogo (`catalog.vue`, sección `🔍 Filtros del catálogo`) a
primera vista “parecen” un bloque de contenido del editor de páginas.
**No lo son.**

### Naturaleza
- Son **LÓGICA DE PRESENTACIÓN (código) ligada al DOM** de la página.
- Barra sticky con píldoras de formato + **drawer lateral premium** de facetas.
- No se renderiza desde `page_sections` ni se gestiona como una sección CMS.
- Tampoco son configurables “grupo a grupo” desde el admin editor (y **no deben
  serlo hoy**).

### ¿De dónde salen los valores de los filtros?
Se **derivan automáticamente de la BD**, sin doble fuente de verdad:

| Faceta | Fuente (Supabase) | Se actualiza |
|--------|-------------------|--------------|
| Formato (Tipo: Vela/Aceite/Bruma…) | `product_categories` | Al crear/editar categorías en admin |
| Aroma | `fragrance_profiles` (+`collections`) | Al crear/editar perfiles aromáticos |
| Colección olfativa | `fragrance_profiles.collections` | Ídem (se cruza con productos) |
| Inspirado en / hotel | `fragrance_profiles.hotel_reference` | Ídem |
| Conteos/badges | Computeds sobre `products` | Automático |
| Categorías visibles del filtro base | `loadCategories()` | Automático |

Por eso, **cambiar en el admin** una categoría/colección/perfil se refleja en
estos filtros sin tocar este archivo.

### Qué SÍ es editable vía admin en esta página
Vía `site_config > catalog_page`:
- `header.badge/title/highlight/description`
- `blocks.header.enabled / .compact`
- `blocks.filters.enabled` → muestra/oculta la barra de filtros completa
- `blocks.olfactory / grid / scent_guide / cta .enabled`
- `scent_guide.*` y `cta.*`

### ¿Cuándo sería correcto “refactorizar a editor”?
Solo si el negocio pide **facetas nuevas configurables por página/tienda**, p. ej.:
- Precio / rango
- Certificaciones / sustentabilidad
- Ubicación / disponibilidad

En ese caso (y no antes) **es momento** de:
1. Convertir la barra+drawer en un **componente genérico** `FacetFilters.vue`
   (recibe `products`, `aromas`, `categories` y una **config de grupos**).
2. Definir los grupos de facets en `site_config > catalog_page > blocks.filters.groups`
   con `{ key, label, source }` y hacer el filtrado data-driven.
3. Exponer ese editor en el admin (`components/editor/…`).
Haciéndolo antes del requerimiento real se añade indirección y riesgo sin
beneficio; el proyecto prioriza flujos limpios sobre abstracciones prematuras.

### Notas de UX heredadas (no romper en futuros cambios)
- Píldoras de formato SIEMPRE visibles = “atalajo primario” (no requiere abrir nada).
- El resto de facets están **bajo demanda** en un drawer para no robar espacio al grid.
- Filtrado **cruzado** (tipo + aroma + colección + hotel) operativamente real con
  conteos verdaderos por opción.
