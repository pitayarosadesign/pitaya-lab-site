<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      @click.self="close"
    >
      <div class="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="text-2xl font-serif font-bold text-earth-900">🛍️ Completa tu pedido B2B</h3>
            <p class="text-sm text-earth-400 mt-1">Revisa tu resumen y procede al pago seguro con Stripe</p>
          </div>
          <button
            @click="close"
            class="w-10 h-10 rounded-full bg-earth-100 hover:bg-earth-200 flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5 text-earth-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Resumen del pedido -->
        <div v-if="order" class="bg-earth-50 rounded-2xl p-5 mb-6">
          <p class="text-sm font-semibold text-earth-800 mb-3">Resumen de tu {{ order.type === 'event' ? 'recuerdo personalizado' : 'pedido de mayoreo' }}</p>

          <!-- Evento -->
          <template v-if="order.type === 'event'">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-earth-500">Envase</span><span class="text-earth-800 font-medium">{{ order.envase?.nombre }}</span></div>
              <div class="flex justify-between"><span class="text-earth-500">Fragancia</span><span class="text-earth-800 font-medium">{{ order.fragancia?.nombre }}</span></div>
              <div class="flex justify-between"><span class="text-earth-500">Etiqueta</span><span class="text-earth-800 font-medium">{{ order.disenio?.name }}</span></div>
              <div class="flex justify-between"><span class="text-earth-500">Cantidad</span><span class="text-earth-800 font-medium">{{ order.cantidad }} pzas a {{ formatMXN(order.precioUnitario) }}</span></div>
              <div v-if="order.premiumKit" class="flex justify-between"><span class="text-earth-500">Kit Premium</span><span class="text-earth-800 font-medium">+{{ formatMXN(order.addonPremium) }}/pza</span></div>
              <div v-if="order.eventDate" class="flex justify-between"><span class="text-earth-500">Fecha del evento</span><span class="text-earth-800 font-medium">{{ order.eventDate }}</span></div>
              <div class="flex justify-between pt-2 border-t border-earth-200"><span class="font-semibold text-earth-800">Total</span><span class="text-xl font-bold text-primary-700">{{ formatMXN(order.total) }}</span></div>
            </div>
          </template>

          <!-- Mayoreo -->
          <template v-else>
            <div class="space-y-2 text-sm">
              <div v-for="item in order.items" :key="item.key" class="flex justify-between">
                <span class="text-earth-500">{{ item.qty }} × {{ item.label }}</span>
                <span class="text-earth-800 font-medium">{{ formatMXN(item.qty * item.retailPrice) }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-earth-200">
                <span class="text-earth-500">Total piezas</span>
                <span class="text-earth-800 font-medium">{{ order.totalPieces }} pzas · −{{ order.discountPercent }}%</span>
              </div>
              <div class="flex justify-between"><span class="font-semibold text-earth-800">Total mayoreo</span><span class="text-xl font-bold text-primary-700">{{ formatMXN(order.wholesaleTotal) }}</span></div>
            </div>
          </template>
        </div>

        <!-- Mensaje lead time -->
        <div v-if="order?.type === 'event'" class="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p class="text-xs text-amber-800 leading-relaxed">
            ⏱️ <strong>Importante:</strong> {{ leadTimeMessage }}
          </p>
        </div>

        <!-- Formulario -->
        <form @submit.prevent="proceedToCheckout" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-earth-700 mb-1">Nombre *</label>
            <input v-model="contact.name" type="text" required placeholder="Tu nombre completo" class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-earth-700 mb-1">Email *</label>
              <input v-model="contact.email" type="email" required placeholder="tucorreo@ejemplo.com" class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
            <div>
              <label class="block text-sm font-medium text-earth-700 mb-1">Teléfono / WhatsApp</label>
              <input v-model="contact.phone" type="tel" placeholder="55 1234 5678" class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
          </div>

          <!-- Notas -->
          <div>
            <label class="block text-sm font-medium text-earth-700 mb-1">Notas adicionales <span class="text-earth-400 text-xs">(opcional)</span></label>
            <textarea v-model="contact.notes" rows="3" placeholder="Detalles de entrega, instrucciones, etc." class="w-full px-4 py-2.5 rounded-lg border border-earth-200 focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none transition-all resize-none" />
          </div>

          <!-- Error -->
          <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

          <!-- Botones -->
          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              @click="close"
              class="px-5 py-3 rounded-xl text-sm font-medium text-earth-600 hover:text-earth-800 border border-earth-200 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="processing"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <svg v-if="processing" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              {{ processing ? 'Procesando...' : 'Pagar con Stripe' }}
            </button>
          </div>
          <p class="text-xs text-earth-400 text-center">
            🔒 Pago seguro procesado por Stripe. Recibirás tu número de pedido y la programación de entrega por correo.
          </p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { formatMXN, DEFAULT_B2B } from '~/composables/useB2B'
import { useB2BConfig } from '~/composables/useB2BConfig'

const props = defineProps<{
  open: boolean
  order: any | null
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'complete', payload: any): void
}>()

const supabase = useNuxtApp()?.$supabase

// Contacto
const contact = reactive({
  name: '',
  email: '',
  phone: '',
  notes: '',
})

const processing = ref(false)
const error = ref<string | null>(null)

// Lead time message
const leadTimeMessage = ref(DEFAULT_B2B.contacto.lead_time_message)

onMounted(async () => {
  const cfg = await useB2BConfig()
  if (cfg.contacto?.lead_time_message) {
    leadTimeMessage.value = cfg.contacto.lead_time_message
  }
})

function close() {
  if (processing.value) return
  emit('close')
}

// Helpers para construir el checkout
function buildPriceData() {
  const isEvent = props.order?.type === 'event'

  if (isEvent) {
    const precioUnitario = props.order.precioUnitario + (props.order.premiumKit ? props.order.addonPremium : 0)
    return {
      name: `Recuerdo Perfumero Personalizado — ${props.order.envase?.nombre} · ${props.order.fragancia?.nombre}`,
      description: `${props.order.cantidad} pzas · Etiqueta: ${props.order.disenio?.name}${props.order.textoPersonalizado ? ` · ${props.order.textoPersonalizado}` : ''}${props.order.premiumKit ? ' · Kit Premium' : ''}`,
      unitPrice: precioUnitario, // en pesos
      quantity: props.order.cantidad,
      image: null,
    }
  }

  // Mayoreo
  return {
    name: `Pedido de Mayoreo PITAYA LAB (${props.order.totalPieces} pzas, −${props.order.discountPercent}%)`,
    description: props.order.items.map(i => `${i.qty}× ${i.label}`).join(', '),
    unitPrice: props.order.wholesaleTotal,
    quantity: 1,
    image: null,
  }
}

async function proceedToCheckout() {
  if (!props.order) return
  processing.value = true
  error.value = null

  try {
    const priceData = buildPriceData()

    // Redirigir a checkout del store pasando los datos
    const payload = {
      items: [{
        name: priceData.name,
        description: priceData.description,
        price: Math.round(priceData.unitPrice * 100), // centavos
        quantity: priceData.quantity,
      }],
      customerEmail: contact.email,
      customerName: contact.name,
      customerPhone: contact.phone,
      orderType: props.order.type,
      eventDate: props.order.eventDate || null,
      customDesign: props.order.disenio?.id === 'custom'
        ? (props.order.disenio.fileName || null)
        : (props.order.disenio?.name || null),
      customText: props.order.textoPersonalizado || null,
      premiumKit: props.order.premiumKit || false,
      b2bDiscountPercent: props.order.discountPercent || 0,
      leadTimeDays: props.order.leadTimeDays || (props.order.type === 'event' ? 15 : null),
      notes: contact.notes || null,
      successUrl: `${window.location.origin}/b2b/gracias`,
      cancelUrl: `${window.location.origin}/b2b`,
    }

    const res = await $fetch('/api/checkout/b2b/create', {
      method: 'POST',
      body: payload,
    })

    if (res?.url) {
      emit('complete', { orderNumber: res.orderNumber })
      // Redirigir a Stripe
      window.location.href = res.url
    } else if (res?.error) {
      error.value = res.error
    }
  } catch (e: any) {
    console.error('Error en checkout B2B:', e)
    error.value = e.data?.message || e.message || 'Error al procesar el pago'
  } finally {
    processing.value = false
  }
}
</script>
