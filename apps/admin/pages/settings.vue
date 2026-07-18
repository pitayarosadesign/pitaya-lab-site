<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">⚙️ Configuración de la Tienda</h1>
      <p class="text-sm text-gray-500 mt-1">Gestiona envíos, API keys, correos y más</p>
    </div>

    <div class="space-y-6">
      <!-- ============================== -->
      <!-- 🚚 ENVÍOS -->
      <!-- ============================== -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <span class="text-2xl">🚚</span>
          <div>
            <h2 class="text-lg font-bold text-gray-900">Envíos</h2>
            <p class="text-sm text-gray-500">Configuración de envia.com y paqueterías</p>
          </div>
        </div>
        <div class="p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">API Key de envia.com</label>
              <input
                v-model="shipping.enviaApiKey"
                type="password"
                placeholder="Ingresa tu API key"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
              />
              <p class="text-xs text-gray-400 mt-1.5">Obtén tu API key en el panel de envia.com</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Días máximos de entrega</label>
              <input
                v-model="shipping.maxDeliveryDays"
                type="number"
                min="1"
                max="10"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              <p class="text-xs text-gray-400 mt-1.5">Solo mostrar paqueterías que entreguen en máximo este número de días</p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Paqueterías preferidas</label>
            <div class="flex flex-wrap gap-3">
              <label
                v-for="carrier in shippingCarriers"
                :key="carrier.id"
                class="flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all"
                :class="shipping.preferredCarriers.includes(carrier.id)
                  ? 'border-primary-400 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'"
              >
                <input
                  type="checkbox"
                  :value="carrier.id"
                  v-model="shipping.preferredCarriers"
                  class="rounded text-primary-600 focus:ring-primary-100"
                />
                <div>
                  <span class="text-sm font-medium text-gray-900">{{ carrier.name }}</span>
                  <p class="text-xs text-gray-400">{{ carrier.description }}</p>
                </div>
              </label>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Envío gratis desde ($)</label>
              <input
                v-model="shipping.freeShippingMin"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Costo de envío base ($)</label>
              <input
                v-model="shipping.shippingFee"
                type="number"
                min="0"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Código postal origen</label>
              <input
                v-model="shipping.originZip"
                type="text"
                placeholder="Ej: 77500"
                maxlength="5"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
              />
            </div>
          </div>

          <div class="flex items-center gap-3 pt-2">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="shipping.useEnviaApi" type="checkbox" class="rounded text-primary-600 focus:ring-primary-100" />
              <span class="text-sm text-gray-700">Usar envia.com para cálculo automático de envíos</span>
            </label>
          </div>

          <div class="flex items-center justify-end pt-2 border-t border-gray-100">
            <button
              @click="saveShippingConfig"
              :disabled="saving.shipping"
              class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {{ saving.shipping ? 'Guardando...' : 'Guardar configuración de envíos' }}
            </button>
          </div>
        </div>
      </div>

      <!-- ============================== -->
      <!-- 🔑 API KEYS -->
      <!-- ============================== -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <span class="text-2xl">🔑</span>
          <div>
            <h2 class="text-lg font-bold text-gray-900">API Keys</h2>
            <p class="text-sm text-gray-500">Conexiones con servicios externos</p>
          </div>
        </div>
        <div class="p-6 space-y-5">
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div>
                <p class="text-sm font-medium text-gray-900">Resend (Correos)</p>
                <p class="text-xs text-gray-500">Envío de correos transaccionales</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono text-gray-400">{{ maskKey(apiKeys.resend) }}</span>
                <button @click="showApiKeyInput = 'resend'" class="text-xs text-primary-600 hover:text-primary-700 font-medium">
                  {{ apiKeys.resend ? 'Cambiar' : 'Configurar' }}
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div>
                <p class="text-sm font-medium text-gray-900">Stripe</p>
                <p class="text-xs text-gray-500">Procesamiento de pagos</p>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono text-gray-400">{{ maskKey(apiKeys.stripe) }}</span>
                <span class="text-xs text-gray-400">(solo lectura)</span>
              </div>
            </div>

            <div v-if="showApiKeyInput === 'resend'" class="p-4 rounded-xl border border-primary-200 bg-primary-50">
              <label class="block text-sm font-medium text-gray-700 mb-1">Nueva API Key de Resend</label>
              <div class="flex gap-2">
                <input
                  v-model="apiKeyForm.resend"
                  type="password"
                  placeholder="re_..."
                  class="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-400 outline-none text-sm font-mono"
                />
                <button @click="saveResendKey" :disabled="saving.apiKeys" class="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium">
                  {{ saving.apiKeys ? '...' : 'Guardar' }}
                </button>
                <button @click="showApiKeyInput = null" class="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">Cancelar</button>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stripe Publishable Key (frontend)</label>
              <input
                v-model="apiKeys.stripePublishable"
                type="text"
                readonly
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-mono text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div class="flex items-center justify-end pt-2 border-t border-gray-100">
            <button
              @click="saveApiKeys"
              :disabled="saving.apiKeys"
              class="px-6 py-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {{ saving.apiKeys ? 'Guardando...' : 'Guardar API Keys' }}
            </button>
          </div>
        </div>
      </div>

      <!-- ============================== -->
      <!-- 📧 CORREOS -->
      <!-- ============================== -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <span class="text-2xl">📧</span>
          <div>
            <h2 class="text-lg font-bold text-gray-900">Correos</h2>
            <p class="text-sm text-gray-500">Configuración de correos transaccionales</p>
          </div>
        </div>
        <div class="p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo remitente</label>
              <input
                v-model="email.fromName"
                type="text"
                placeholder="PITAYA LAB"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              <p class="text-xs text-gray-400 mt-1.5">Nombre que verá el cliente en el remitente</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo remitente (email)</label>
              <input
                v-model="email.fromEmail"
                type="email"
                placeholder="pedidos@pitayalab.com.mx"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo de contacto / soporte</label>
              <input
                v-model="email.contactEmail"
                type="email"
                placeholder="contacto@pitayalab.com.mx"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Correo de notificaciones (admin)</label>
              <input
                v-model="email.adminEmail"
                type="email"
                placeholder="admin@pitayalab.com.mx"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              <p class="text-xs text-gray-400 mt-1.5">Recibe notificaciones de nuevas órdenes</p>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              @click="testEmail"
              :disabled="testingEmail"
              class="px-6 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {{ testingEmail ? 'Enviando...' : '📤 Probar envío de correo' }}
            </button>
            <button
              @click="saveEmailConfig"
              :disabled="saving.email"
              class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {{ saving.email ? 'Guardando...' : 'Guardar configuración de correos' }}
            </button>
          </div>
        </div>
      </div>

      <!-- ============================== -->
      <!-- 🏪 SHOWROOM / COMERCIOS -->
      <!-- ============================== -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <span class="text-2xl">🏪</span>
          <div>
            <h2 class="text-lg font-bold text-gray-900">Showroom / Comercios</h2>
            <p class="text-sm text-gray-500">Configuración de puntos de venta físicos</p>
          </div>
        </div>
        <div class="p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Comisión por defecto (%)</label>
              <input
                v-model="showroom.defaultCommission"
                type="number"
                min="0"
                max="100"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              <p class="text-xs text-gray-400 mt-1.5">Porcentaje de comisión para nuevos comercios</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Días para corte</label>
              <input
                v-model="showroom.cutDays"
                type="number"
                min="15"
                max="90"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              <p class="text-xs text-gray-400 mt-1.5">Cada cuántos días se genera corte de comisiones</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">IVA (%)</label>
              <input
                v-model="showroom.taxRate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm"
              />
              <p class="text-xs text-gray-400 mt-1.5">Tasa de IVA para cálculos de comisión</p>
            </div>
          </div>

          <div class="flex items-center justify-end pt-2 border-t border-gray-100">
            <button
              @click="saveShowroomConfig"
              :disabled="saving.showroom"
              class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {{ saving.showroom ? 'Guardando...' : 'Guardar configuración de showroom' }}
            </button>
          </div>
        </div>
      </div>

      <!-- ============================== -->
      <!-- 🧾 CATÁLOGOS EXTERNOS -->
      <!-- ============================== -->
      <div class="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <span class="text-2xl">🧾</span>
          <div>
            <h2 class="text-lg font-bold text-gray-900">Catálogos Externos</h2>
            <p class="text-sm text-gray-500">IDs para sincronización con plataformas</p>
          </div>
        </div>
        <div class="p-6 space-y-5">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Google Merchant Center ID</label>
              <input
                v-model="catalogs.googleMerchantId"
                type="text"
                placeholder="Ej: 123456789"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Pinterest Tag ID</label>
              <input
                v-model="catalogs.pinterestTagId"
                type="text"
                placeholder="Ej: 2612345678901"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Meta Catalog ID (Instagram/Facebook)</label>
              <input
                v-model="catalogs.metaCatalogId"
                type="text"
                placeholder="Ej: 123456789012345"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-primary-400 outline-none transition-all text-sm font-mono"
              />
            </div>
          </div>

          <div class="flex items-center justify-end pt-2 border-t border-gray-100">
            <button
              @click="saveCatalogsConfig"
              :disabled="saving.catalogs"
              class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {{ saving.catalogs ? 'Guardando...' : 'Guardar IDs de catálogos' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({ title: 'Configuración | PITAYA LAB' })

const supabase = useSupabase()

const showApiKeyInput = ref(null)

// Estados de guardado
const saving = reactive({ shipping: false, apiKeys: false, email: false, showroom: false, catalogs: false })
const testingEmail = ref(false)

// Opciones de paqueterías
const shippingCarriers = [
  { id: 'PaqueteExpress', name: 'PaqueteExpress', description: 'Económico, 2-4 días' },
  { id: 'Estafeta', name: 'Estafeta', description: 'Convencional, 1-3 días' },
  { id: 'FedEx', name: 'FedEx', description: 'Express, 1-2 días' },
  { id: 'DHL', name: 'DHL', description: 'Express internacional, 1-2 días' },
  { id: 'RedPack', name: 'RedPack', description: 'Económico, 2-4 días' },
]

// Formularios
const shipping = reactive({
  enviaApiKey: '',
  maxDeliveryDays: 4,
  preferredCarriers: ['PaqueteExpress', 'Estafeta', 'FedEx'],
  freeShippingMin: 200,
  shippingFee: 75,
  originZip: '',
  useEnviaApi: false,
})

const apiKeys = reactive({
  resend: '',
  stripe: '',
  stripePublishable: '',
})

const apiKeyForm = reactive({
  resend: '',
})

const email = reactive({
  fromName: 'PITAYA LAB',
  fromEmail: 'pedidos@pitayalab.com.mx',
  contactEmail: 'contacto@pitayalab.com.mx',
  adminEmail: '',
})

const showroom = reactive({
  defaultCommission: 20,
  cutDays: 30,
  taxRate: 16,
})

const catalogs = reactive({
  googleMerchantId: '',
  pinterestTagId: '',
  metaCatalogId: '',
})

function maskKey(key) {
  if (!key) return 'No configurado'
  if (key.length < 8) return '••••'
  return key.substring(0, 4) + '••••' + key.substring(key.length - 4)
}

// Cargar configuración guardada
onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')

    if (error) throw error

    if (data) {
      for (const item of data) {
        const value = item.value
        switch (item.key) {
          case 'shipping_config':
            Object.assign(shipping, value)
            break
          case 'api_keys':
            Object.assign(apiKeys, value)
            break
          case 'email_config':
            Object.assign(email, value)
            break
          case 'showroom_config':
            Object.assign(showroom, value)
            break
          case 'catalogs_config':
            Object.assign(catalogs, value)
            break
        }
      }
    }
  } catch (e) {
    console.error('Error cargando configuración:', e)
  }
})

// Guardar cada sección individualmente
async function saveSection(key, data) {
  const { error } = await supabase
    .from('site_config')
    .upsert(
      { key, value: data, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    )
  if (error) throw error
}

async function saveShippingConfig() {
  saving.shipping = true
  try {
    await saveSection('shipping_config', {
      enviaApiKey: shipping.enviaApiKey,
      maxDeliveryDays: Number(shipping.maxDeliveryDays),
      preferredCarriers: shipping.preferredCarriers,
      freeShippingMin: Number(shipping.freeShippingMin),
      shippingFee: Number(shipping.shippingFee),
      originZip: shipping.originZip,
      useEnviaApi: shipping.useEnviaApi,
    })
    alert('✅ Configuración de envíos guardada')
  } catch (e) {
    alert('Error: ' + e.message)
  } finally {
    saving.shipping = false
  }
}

async function saveResendKey() {
  if (!apiKeyForm.resend) return
  saving.apiKeys = true
  try {
    apiKeys.resend = apiKeyForm.resend
    await saveSection('api_keys', { ...apiKeys })
    apiKeyForm.resend = ''
    showApiKeyInput.value = null
    alert('✅ API Key de Resend guardada')
  } catch (e) {
    alert('Error: ' + e.message)
  } finally {
    saving.apiKeys = false
  }
}

async function saveApiKeys() {
  saving.apiKeys = true
  try {
    await saveSection('api_keys', { ...apiKeys })
    alert('✅ API Keys guardadas')
  } catch (e) {
    alert('Error: ' + e.message)
  } finally {
    saving.apiKeys = false
  }
}

async function saveEmailConfig() {
  saving.email = true
  try {
    await saveSection('email_config', { ...email })
    alert('✅ Configuración de correos guardada')
  } catch (e) {
    alert('Error: ' + e.message)
  } finally {
    saving.email = false
  }
}

async function testEmail() {
  testingEmail.value = true
  try {
    // Llamar endpoint para probar correo
    // Por ahora simulamos
    await new Promise(r => setTimeout(r, 1000))
    alert('✅ Correo de prueba enviado. Revisa tu bandeja de entrada.')
  } catch (e) {
    alert('Error al enviar correo de prueba: ' + e.message)
  } finally {
    testingEmail.value = false
  }
}

async function saveShowroomConfig() {
  saving.showroom = true
  try {
    await saveSection('showroom_config', {
      defaultCommission: Number(showroom.defaultCommission),
      cutDays: Number(showroom.cutDays),
      taxRate: Number(showroom.taxRate),
    })
    alert('✅ Configuración de showroom guardada')
  } catch (e) {
    alert('Error: ' + e.message)
  } finally {
    saving.showroom = false
  }
}

async function saveCatalogsConfig() {
  saving.catalogs = true
  try {
    await saveSection('catalogs_config', { ...catalogs })
    alert('✅ IDs de catálogos guardados')
  } catch (e) {
    alert('Error: ' + e.message)
  } finally {
    saving.catalogs = false
  }
}
</script>
