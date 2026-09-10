/**
 * 🛒 PITAYA LAB - Carrito de Compras
 * ==================================
 * Store de Pinia para manejar el carrito de compras
 * Persistencia en localStorage
 */

export interface CartItem {
  id: string
  slug: string
  name: string
  subtitle?: string
  price: number
  image: string | null
  variant?: {
    id: string
    name: string
  } | null
  quantity: number
  /** true = sobre pedido (sin stock, se prepara en taller) */
  backorder?: boolean
  /** meta opcional de preparación / envío para estimados por ítem */
  prepDaysMin?: number
  prepDaysMax?: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  /** Nota general del pedido (opcional, aplica a toda la compra) */
  orderNote: string
}

// Helper para cargar del localStorage
function loadCart(): CartItem[] {
  if (import.meta.client) {
    try {
      const saved = localStorage.getItem('pitaya-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  }
  return []
}

// Helper para guardar en localStorage
function saveCart(items: CartItem[]) {
  if (import.meta.client) {
    try {
      localStorage.setItem('pitaya-cart', JSON.stringify(items))
    } catch (e) {
      console.warn('Error guardando carrito:', e)
    }
  }
}

// Helper para cargar/guardar la nota del pedido
function loadOrderNote(): string {
  if (import.meta.client) {
    try {
      return localStorage.getItem('pitaya-cart-note') || ''
    } catch {
      return ''
    }
  }
  return ''
}

function saveOrderNote(note: string) {
  if (import.meta.client) {
    try {
      localStorage.setItem('pitaya-cart-note', note || '')
    } catch (e) {
      console.warn('Error guardando nota del pedido:', e)
    }
  }
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    isOpen: false,
    orderNote: '',
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),

    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),

    formattedTotal: (state) => {
      return state.items
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },

    hasItems: (state) => state.items.length > 0,

    itemCount: (state) => state.items.length,
  },

  actions: {
    init() {
      this.items = loadCart()
      this.orderNote = loadOrderNote()
    },

    setOrderNote(note: string) {
      this.orderNote = note || ''
      saveOrderNote(this.orderNote)
    },

    addItem(item: CartItem) {
      const existing = this.items.find(
        i => i.id === item.id && i.variant?.id === item.variant?.id
      )

      if (existing) {
        existing.quantity += item.quantity
      } else {
        this.items.push({ ...item })
      }

      saveCart(this.items)
      this.isOpen = true
    },

    removeItem(itemId: string, variantId?: string) {
      this.items = this.items.filter(
        i => !(i.id === itemId && i.variant?.id === variantId)
      )
      saveCart(this.items)
    },

    updateQuantity(itemId: string, quantity: number, variantId?: string) {
      const item = this.items.find(
        i => i.id === itemId && i.variant?.id === variantId
      )
      if (item) {
        item.quantity = Math.max(1, quantity)
        saveCart(this.items)
      }
    },

    clearCart() {
      this.items = []
      this.orderNote = ''
      saveCart(this.items)
      saveOrderNote('')
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    },

    // Obtener items agrupados para el checkout
    getCheckoutItems() {
      return this.items.map(item => ({
        price: Math.round(item.price * 100), // Stripe usa centavos
        quantity: item.quantity,
        name: `${item.name}${item.variant ? ' - ' + item.variant.name : ''}`,
        description: item.subtitle || '',
        image: item.image || undefined,
      }))
    },
  },
})

