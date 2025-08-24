<template>
  <div class="product-info" @click="$emit('click')">
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p class="price">${{ product.price }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  product: {
    id: number
    title: string
    description: string
    price: number
  }
}
const props = defineProps<Props>()
</script>

<style scoped>
.product-info {
  cursor: pointer;
  padding: 1rem;
  flex-grow: 1;
}

h2 {
  font-size: 1rem;
  margin: 0.5rem 0;
}

p {
  font-size: 0.875rem;
  margin: 0.25rem 0;
}

.price {
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>
