<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../../../stores/cart.js'

const props = defineProps({
  product: Object
})

const router = useRouter()
const cartStore = useCartStore()
const current = ref(0)

watch(() => props.product?.images, () => {
  current.value = 0
}, { deep: true })

const goToProduct = () => router.push(`/product/${props.product.id}`)
const addToCart = (event) => {
  event.stopPropagation()
  cartStore.addToCart(props.product)
}

const nextImage = () => {
  if (!props.product.images) return
  current.value = (current.value + 1) % props.product.images.length
}

const prevImage = () => {
  if (!props.product.images) return
  current.value = (current.value - 1 + props.product.images.length) % props.product.images.length
}
</script>

<template>
  <div class="product-card" @click="goToProduct" v-if="props.product">
    <div class="product-images">
      <img
        v-if="props.product.images?.length"
        :src="props.product.images[current]"
        alt="Product"
        class="product-img"
      />
      <div v-else class="image-placeholder">Нет изображения</div>

      <div class="slider-controls" v-if="props.product.images?.length > 1">
        <button @click.stop="prevImage">‹</button>
        <button @click.stop="nextImage">›</button>
      </div>
    </div>

    <div class="product-info">
      <h3 class="title">{{ props.product.title }}</h3>
      <p class="description">{{ props.product.description }}</p>
      <div class="price">
        <span v-if="props.product.discountPercentage" class="original">
          ${{ props.product.price.toFixed(2) }}
        </span>
        <span class="discount">
          ${{ (props.product.price * (1 - (props.product.discountPercentage ?? 0)/100)).toFixed(2) }}
        </span>
      </div>
      <button class="add-btn" @click="addToCart">🛒 В корзину</button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 260px;  /* ширина карточки */
  height: 400px; /* высота карточки */
  transition: transform 0.2s, box-shadow 0.2s;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.product-images {
  width: 100%;
  height: 200px; /* фиксированная высота изображения */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #f9f9f9;
}

.product-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #aaa;
  font-size: 0.9rem;
  background: #f0f0f0;
}

.slider-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.slider-controls button {
  background: rgba(0,0,0,0.3);
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  border-radius: 4px;
}

.product-info {
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex-grow: 1;
}

.title {
  font-size: 1.1rem;
  margin: 0;
  height: 1.2em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.description {
  font-size: 0.85rem;
  color: #555;
  height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  font-size: 1rem;
}

.original {
  text-decoration: line-through;
  color: #aaa;
}

.discount {
  color: #e74c3c;
  font-weight: bold;
}

.add-btn {
  margin-top: auto;
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.add-btn:hover {
  background-color: #2980b9;
}
</style>
