import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const total = ref(0)
  const page = ref(0)
  const limit = 20
  const loading = ref(false)
  const error = ref('')

  const fetchProducts = async (reset = false) => {
    if (loading.value) return
    loading.value = true
    try {
      if (reset) {
        products.value = []
        page.value = 0
      }
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${page.value * limit}`)
      const data = await res.json()
      products.value.push(...data.products)
      total.value = data.total
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const nextPage = async () => {
    page.value++
    await fetchProducts()
  }

  const resetProducts = () => {
    products.value = []
    page.value = 0
  }

  return { products, total, page, loading, error, fetchProducts, nextPage, resetProducts }
})
