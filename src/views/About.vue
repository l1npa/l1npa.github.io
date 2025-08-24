<script setup>
const teamMembers = [
  {
    name: 'Alice Johnson',
    role: 'CEO',
    photo: 'https://i.pravatar.cc/150?img=1',
    bio: 'Visionary leader with 10+ years experience in tech.'
  },
  {
    name: 'Bob Smith',
    role: 'CTO',
    photo: 'https://i.pravatar.cc/150?img=2',
    bio: 'Tech wizard driving our innovative solutions.'
  },
  {
    name: 'Carol White',
    role: 'Designer',
    photo: 'https://i.pravatar.cc/150?img=3',
    bio: 'Creates beautiful and intuitive designs.'
  }
]
</script>

<template>
  <div class="about-page">
    <section class="hero">
      <h1>О нас</h1>
      <p>Мы создаём современные решения, чтобы улучшить жизнь наших пользователей.</p>
    </section>

    <section class="team">
      <h2>Наша команда</h2>
      <div class="team-grid">
        <div v-for="member in teamMembers" :key="member.name" class="team-card">
          <img :src="member.photo" :alt="member.name" class="team-photo"/>
          <h3 class="team-name">{{ member.name }}</h3>
          <p class="team-role">{{ member.role }}</p>
          <p class="team-bio">{{ member.bio }}</p>
        </div>
      </div>
    </section>

    <section class="mission">
      <h2>Наша миссия</h2>
      <p>Создавать интуитивные, надёжные и современные продукты, которые решают реальные задачи пользователей.</p>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
  color: #333;
}

.hero {
  text-align: center;
  margin-bottom: 3rem;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.25rem;
  color: #555;
}

.team {
  margin-bottom: 3rem;
}

.team h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.team-card {
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.team-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.team-name {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.team-role {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 0.5rem;
}

.team-bio {
  font-size: 0.9rem;
  color: #555;
}

.mission h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.mission p {
  font-size: 1.1rem;
  color: #555;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}
</style>
