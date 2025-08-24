<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '../components/product/card/ProductCard.vue'
import { useProductsStore } from '../stores/products.js'

const store = useProductsStore()
const loadingMore = ref(false)

onMounted(() => {
  store.fetchProducts()
})

const loadMore = async () => {
  loadingMore.value = true
  const scrollY = window.scrollY
  await store.nextPage()
  window.scrollTo(0, scrollY)
  loadingMore.value = false
}
</script>

<template>
  <div>
    <h1>Главная</h1>

    <div v-if="store.error">{{ store.error }}</div>
    <div v-else>
      <div class="products-grid">
        <ProductCard
          v-for="product in store.products"
          :key="product.id"
          :product="product"
        />
      </div>

      <button @click="loadMore" :disabled="loadingMore || store.products.length >= store.total">
        {{ loadingMore ? 'Загрузка...' : 'Загрузить ещё' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-items: center;
}

button {
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}
@media (max-width: 1200px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
