<template>
  <div>
    <NavBar/>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from "../components/header/NavBar.vue"
</script>

<style scoped>
.main-content {
  padding: 2rem;
}
</style>
