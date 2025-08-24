<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart.js'
import ProductImages from '../components/product/card/ProductImages.vue'
import ProductComment from '../components/product/ProductComment.vue'

const route = useRoute()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(false)
const error = ref('')

const fetchProduct = async (id) => {
  loading.value = true
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`)
    if (!res.ok) throw new Error('Ошибка загрузки товара')
    const data = await res.json()

    data.discountPrice = data.price * (1 - (data.discountPercentage || 0) / 100)

    product.value = data
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const id = route.params.id
  if (id) fetchProduct(id)
})

const addToCart = () => {
  if (product.value) cartStore.addToCart(product.value)
}
</script>

<template>
  <div v-if="product" class="product-page">
    <div class="product-container">
      <ProductImages :images="product.images" />

      <div class="product-details">
        <h1 class="product-title">{{ product.title }}</h1>

        <div class="average-rating" v-if="product.rating">
          <div class="stars">
            <div class="stars-filled" :style="{ width: (product.rating / 5 * 100) + '%' }">★★★★★</div>
            <div class="stars-bg">★★★★★</div>
          </div>
          <span class="rating-value">{{ product.rating.toFixed(1) }}</span>
        </div>

        <div class="product-price">
          <span v-if="product.discountPrice < product.price" class="original-price">
            ${{ product.price }}
          </span>
          <span class="discount-price">${{ product.discountPrice.toFixed(2) }}</span>
        </div>

        <p class="product-description">{{ product.description }}</p>

        <div class="product-tags">
          <span v-for="tag in product.tags || []" :key="tag" class="tag">{{ tag }}</span>
        </div>

        <button class="add-to-cart" @click="addToCart">🛒 Добавить в корзину</button>

        <h3>Отзывы</h3>
        <div class="comments">
          <ProductComment
            v-for="c in product.reviews || []"
            :key="c.reviewerEmail + c.date"
            :comment="c"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="loading">Загрузка...</div>
  <div v-else class="error">{{ error || 'Товар не найден' }}</div>
</template>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: flex-start;
}

.product-details {
  flex: 1;
  min-width: 300px;
}

.product-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.average-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.stars {
  position: relative;
  display: inline-block;
  line-height: 1;
}

.stars-bg,
.stars-filled {
  display: block;
  font-size: 1.2rem;
  line-height: 1;
}

.stars-bg {
  color: #ddd;
}

.stars-filled {
  color: #f1c40f;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
}
.rating-value {
  font-weight: bold;
  font-size: 1rem;
  color: #333;
}.product-price {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: baseline;
  gap: 1rem;
}

.original-price {
  text-decoration: line-through;
  color: #aaa;
}

.discount-price {
  color: #e74c3c;
  font-weight: bold;
}

.product-description {
  margin-bottom: 1rem;
  color: #555;
}

.product-tags {
  margin-bottom: 1.5rem;
}

.tag {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.add-to-cart {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 2rem;
}

.add-to-cart:hover {
  background-color: #2980b9;
}

.comments {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.loading,
.error {
  text-align: center;
  font-size: 1.25rem;
  color: #555;
}
</style>
