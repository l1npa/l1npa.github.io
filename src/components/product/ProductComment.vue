<script setup>
const props = defineProps({
  comment: {
    type: Object,
    required: true
  }
})

const formattedDate = new Date(props.comment.date).toLocaleDateString()
</script>

<template>
  <div class="comment-card">
    <div class="comment-header">
      <div class="author">
        <strong>{{ comment.reviewerName }}</strong>
        <span class="email">&lt;{{ comment.reviewerEmail }}&gt;</span>
      </div>
      <div class="rating">
        <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= comment.rating }">★</span>
      </div>
    </div>
    <p class="comment-text">{{ comment.comment }}</p>
    <div class="comment-date">{{ formattedDate }}</div>
  </div>
</template>

<style scoped>
.comment-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1rem;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.comment-card:hover {
  transform: translateY(-2px);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.author {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  color: #333;
}

.email {
  font-weight: normal;
  font-size: 0.8rem;
  color: #888;
}

.rating .star {
  font-size: 1rem;
  color: #ddd;
}

.rating .star.filled {
  color: #f1c40f;
}

.comment-text {
  margin-bottom: 0.5rem;
  color: #555;
  line-height: 1.4;
}

.comment-date {
  font-size: 0.75rem;
  color: #aaa;
  text-align: right;
}
</style>
