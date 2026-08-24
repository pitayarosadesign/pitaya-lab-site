# Guía del Editor de Sitio — PITAYA LAB Admin

Esta guía documenta el **sistema de temas / apariencia** del panel admin y cómo se conecta con el storefront. Es específica del directorio `apps/admin/components/editor/`.

---

## 🎨 Sistema de Temas (Paleta de Colores)

### Arquitectura general

El tema de colores se gestiona en **tres capas** coordinadas:

| Capa | Archivo | Rol |
|------|---------|-----|
| **Paleta por defecto** | `apps/store/assets/css/main.css` (`@theme`) | Valores estáticos compilados en build (fallback / SSR / primer paint) |
| **Variables editables** | `:root` en el mismo CSS + plugin `theme.client.ts` | Sobrescritura en runtime de las variables `--color-*` |
| **Editor admin** | `ThemeEditor.vue` + `site_config` (clave `theme`) | El usuario guarda la paleta en la BD |

### Cómo fluye la data

```
Admin → Apariencia (/site/apariencia) → ThemeEditor
        │  edita ColorScaleEditor (primary | amber | earth)
        │  + opciones avanzadas (background, textColor)
        ▼
    Guardar → upsert en site_config (key='theme', value={...})
                              │
        [tienda]              ▼
    plugin theme.client.ts → lee site_config → aplica CSS vars en :root
                              │
                              ▼
        Todas las clases Tailwind (bg-primary-600, text-earth-900, etc.)
        se actualizan en vivo (usan var(--color-*))
```

### Por qué la paleta en `@theme` es importante (NO es código muerto)

- **SSR / primer paint**: el servidor renderiza con valores concretos antes de que el plugin client-side corra.
- **Fallback**: si Supabase falla o no hay `theme` en `site_config`, la tienda usa la paleta verde/ámbar/tierra por defecto.
- **Resiliencia**: ante errores de red o config faltante, el sitio nunca se ve en blanco.

> ⚠️ **NO** reemplaces los valores en `@theme` por `var()` dinámicos internos — causa bucle de auto-referencia (el fallback se resuelve a sí mismo). La sobrescritura en `:root` (que hace el plugin) es la forma correcta.

### Estructura del valor en `site_config` (clave `theme`)

```json
{
  "key": "theme",
  "value": {
    "primary": {
      "50": "#f0fdf4", "100": "#dcfce7", ..., "900": "#14532d", "950": "#052e16"
    },
    "amber": {
      "50": "#fffbeb", "100": "#fef3c7", ..., "900": "#78350f"
    },
    "earth": {
      "50": "#faf8f5", "100": "#f0ece4", ..., "900": "#584236", "950": "#2f221b"
    },
    "background": "#f0fdf4",
    "textColor": "#584236"
  }
}
```

---

## 🧩 Componentes del Editor de Temas

### `theme.client.ts` (store — `apps/store/plugins/`)
- Plugin client-side que carga la paleta desde `site_config`.
- Aplica las variables en `document.documentElement` (`:root`).
- Usa `useNuxtApp().$supabase` (misma instancia del store, no duplica clientes).
- Si `$supabase` no existe o falla, usa la paleta por defecto (warn en consola).

### `ThemeEditor.vue` (admin)
- Editor principal montado en `/site/apariencia`.
- Carga la paleta desde `site_config` (o usa defaults).
- Permite **Restablecer** (volver a la paleta por defecto = la de `@theme`).
- **Guarda** con upsert sobre `site_config` (`onConflict: 'key'`).
- Muestra una **vista previa en vivo** de la portada completa.

### `ColorScaleEditor.vue` (admin)
- Componente reutilizable para editar una escala de tonos (50–950).
- Prop: `modelValue` (objeto de tonos), `label`, `defaultScale`.
- Emite: `update:modelValue` con el objeto actualizado.
- Permite editar cada tono por hex o color picker, más restablecer por tono.

### `ThemePreview.vue` (admin)
- Maqueta fiel de la portada para mostrar los colores en tiempo real.
- Incluye: navbar, hero con gradiente y orbes, sección de productos, banda de confianza, CTA B2B y footer.
- Todos los estilos usan `:style` ligados a `props.theme` → se repintan al instante.

---

## 🔌 Conexión con el rest del ciclo de vida

### En el build (Tailwind v4)
Las variables `@theme` generan CSS del tipo:
```css
@layer theme { :host, :root { --color-primary-600: #16a34a; ... } }
```
Las utilidades Tailwind usan `var()`:
```css
.bg-primary-600 { background-color: var(--color-primary-600); }
```
→ Al sobrescribir `--color-primary-600` en `:root` (fuera de `@layer`), el color cambia en toda la tienda **sin redeployar**.

### Alcance de lo que cambia con el tema
- ✅ **Cambian**: todas las clases Tailwind (`bg-primary-600`, `text-earth-900`, `border-amber-300`...), el `body` y `.bg-gradient-soft` de `main.css`.
- ⚠️ **NO cambian** (transaccionales, español de marca por diseño):
  - Emails (`apps/store/server/utils/emailLayout.ts` y `webhook.post.ts`).
  - `accent_color` configurado por colección en el admin.

---

## 🖥️ Cómo probar el editor

```bash
# Levantar el admin
cd apps/admin && npm run dev   # → http://localhost:3001

# Navegar a Apariencia
# → http://localhost:3001/site/apariencia
```

Al mover los pickers o inputs de color en `ColorScaleEditor`, la vista previa (`ThemePreview`) se actualiza al instante. Al pulsar **Guardar paleta**, se persiste en `site_config` y la tienda la aplica en el siguiente refresh.

---

## 📝 Convenciones de código

- Todos los nuevos colores del tema deben definirse **como escala completa** (50–950) en `defaultTheme`, `@theme` y `ThemePreview`.
- Usar `:style="{ backgroundColor: theme.X[n] }"` para elementos que deben reflejar el tema en vivo.
- No hardcodear hex en componentes del store que deban ser temables — usar clases Tailwind (`bg-primary-600`, `text-earth-900`).
- Al agregar un nuevo "uso de color", verificar que el tono elegido exista en la escala (ej. `primary[700]` existe, `primary[800]` también).
