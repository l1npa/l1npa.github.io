<template>
  <div class="product-images">
    <img
      v-if="images && images.length"
      :src="images[current]"
      alt="Product"
      class="product-img"
    />
    <div v-else class="image-placeholder">Нет изображения</div>

    <div class="thumbnails" v-if="images && images.length > 1">
      <img
        v-for="(img, index) in images"
        :key="index"
        :src="img"
        :class="{ active: index === current }"
        @click.stop="current = index"
      />
    </div>

    <div class="slider-controls" v-if="images && images.length > 1">
      <button @click.stop="prevImage">‹</button>
      <button @click.stop="nextImage">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  images: { type: Array, default: () => [] }
})

const current = ref(0)

watch(() => props.images, () => {
  current.value = 0
}, { deep: true })

const nextImage = () => {
  if (!props.images.length) return
  current.value = (current.value + 1) % props.images.length
}

const prevImage = () => {
  if (!props.images.length) return
  current.value = (current.value - 1 + props.images.length) % props.images.length
}
</script>

<style scoped>
.product-images {
  position: relative;
  width: 100%;
  max-width: 444400px;
  margin: 0 auto 1rem;
  border-radius: 12px;
  overflow: hidden;
  background: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.product-img {
  width: 100%;
  height: 250px;
  object-fit: contain;
  display: block;
  border-bottom: 1px solid #eee;
}

.image-placeholder {
  width: 100%;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 1rem;
  background: #f0f0f0;
}

.thumbnails {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.thumbnails img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;
  transition: border 0.2s;
}

.thumbnails img.active {
  border-color: #3498db;
}

.slider-controls {
  position: absolute;
  top: 50%;
  width: 97%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 1rem;
}

.slider-controls button {
  background: rgba(0,0,0,0.3);
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s;
}

.slider-controls button:hover {
  background: rgba(0,0,0,0.5);
}
</style>
