<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../../stores/cart.js'

const route = useRoute()
const cartStore = useCartStore()

const menu = [
  { name: 'Главная', path: '/' },
  { name: 'О нас', path: '/about' },
  { name: 'Корзина', path: '/cart' },
]

const openMobile = ref(false)
const showToast = ref(false)
const toastMessage = ref('')

watch(
  () => cartStore.items.length,
  (newVal, oldVal) => {
    if (newVal > oldVal) {
      toastMessage.value = 'Товар добавлен в корзину'
      showToast.value = true
      setTimeout(() => (showToast.value = false), 2000)
    }
  }
)
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">MyShop</div>

      <ul class="menu" :class="{ open: openMobile }">
        <li v-for="item in menu" :key="item.path">
          <router-link
            :to="item.path"
            :class="{ active: route.path === item.path }"
            @click="openMobile = false"
          >
            {{ item.name }}
            <span v-if="item.path === '/cart' && cartStore.items.length" class="cart-count">
              {{ cartStore.items.length }}
            </span>
          </router-link>
        </li>
      </ul>

      <button class="burger" @click="openMobile = !openMobile">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <div v-if="showToast" class="toast">{{ toastMessage }}</div>
  </nav>
</template>

<style scoped>
.navbar {
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
}

.logo {
  font-weight: bold;
  font-size: 1.5rem;
}

.menu {
  list-style: none;
  display: flex;
  gap: 1.5rem;
}

.menu li a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  position: relative;
}

.menu li a:hover {
  color: #ffeb3b;
}

.menu li a.active {
  border-bottom: 2px solid #ffeb3b;
}

.cart-count {
  background: #e74c3c;
  border-radius: 50%;
  padding: 0 0.5rem;
  margin-left: 0.25rem;
  font-size: 0.75rem;
  color: white;
  font-weight: bold;
  position: relative;
  top: -1px;
}

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}

.burger span {
  display: block;
  width: 25px;
  height: 3px;
  background: white;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .menu {
    position: absolute;
    top: 60px;
    right: 0;
    background: #3498db;
    flex-direction: column;
    width: 200px;
    gap: 0;
    padding: 1rem;
    display: none;
  }

  .menu.open {
    display: flex;
  }

  .burger {
    display: flex;
  }
}

.toast {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background: #2ecc71;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  font-weight: bold;
  z-index: 200;
  animation: fadein 0.3s, fadeout 0.3s 1.7s;
}

@keyframes fadein {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeout {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(20px); }
}
</style>
