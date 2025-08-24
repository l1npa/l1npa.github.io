import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])

  const addToCart = (product) => {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (id) => {
    items.value = items.value.filter(i => i.id !== id)
  }

  const updateQuantity = (id, qty) => {
    const item = items.value.find(i => i.id === id)
    if (item) item.quantity = qty
  }

  const clearCart = () => {
    items.value = []
  }

  return { items, addToCart, removeFromCart, updateQuantity, clearCart }
})
