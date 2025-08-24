<template>
  <div class="notfound-page">
    <h1>404</h1>
    <p>Страница не найдена.</p>
    <router-link to="/">← Вернуться на главную</router-link>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.notfound-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
}

.notfound-page h1 {
  font-size: 6rem;
  margin: 0;
  color: #e74c3c;
}

.notfound-page p {
  font-size: 1.5rem;
  margin: 1rem 0;
}

.notfound-page a {
  margin-top: 1rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.notfound-page a:hover {
  text-decoration: underline;
}
</style>
