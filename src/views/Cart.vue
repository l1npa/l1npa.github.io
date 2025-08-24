<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cart.js'

const cartStore = useCartStore()

const cartItems = computed(() => cartStore.items)
const totalPrice = computed(() =>
  cartStore.items.reduce((sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity, 0)
)

const increase = (item) => cartStore.updateQuantity(item.id, item.quantity + 1)
const decrease = (item) => {
  if (item.quantity > 1) cartStore.updateQuantity(item.id, item.quantity - 1)
}
const remove = (item) => cartStore.removeFromCart(item.id)
</script>

<template>
  <div class="cart-page">
    <h1>Корзина</h1>

    <div v-if="!cartItems?.length" class="empty">В корзине пока нет товаров</div>

    <div v-else class="cart-grid">
      <div v-for="item in cartItems" :key="item.id" class="cart-card">
        <img :src="item.images?.[0]" alt="" class="cart-img" />
        <div class="cart-info">
          <h3>{{ item.title }}</h3>
          <p class="price">
            <span v-if="item.discountPrice < item.price" class="original">
              ${{ item.price.toFixed(2) }}
            </span>
            <span class="discount">${{ (item.discountPrice ?? item.price).toFixed(2) }}</span>
          </p>
          <div class="quantity">
            <button @click="decrease(item)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="increase(item)">+</button>
          </div>
          <button class="remove" @click="remove(item)">Удалить</button>
        </div>
      </div>
    </div>

    <div v-if="cartItems?.length" class="cart-summary">
      <span>Итого: ${{ totalPrice.toFixed(2) }}</span>
      <button class="checkout">Оформить заказ</button>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.cart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.cart-card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.cart-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.cart-img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  background: #f9f9f9;
}

.cart-info {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cart-info h3 {
  margin: 0;
  font-size: 1.1rem;
  height: 2.2em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
}

.original {
  text-decoration: line-through;
  color: #aaa;
}

.discount {
  color: #e74c3c;
  font-weight: bold;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity button {
  width: 28px;
  height: 28px;
  border: none;
  background: #3498db;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.remove {
  margin-top: 0.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
}

.checkout {
  background: #2ecc71;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.checkout:hover {
  background: #27ae60;
}

.empty {
  text-align: center;
  color: #555;
  font-size: 1.25rem;
}
</style>
