<template>
  <router-link :to="{ name: 'bakery', params: { bakery: type } }">
    <div class="card">
      <img class="card__img" :src="src" alt="test" />
      <div class="card__content">
        <div class="card__title">{{ title }}</div>
        <div class="card__amount">Рецептов: {{ amount }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
/*eslint-disable*/
export default {
  props: {
    src: String,
    title: String,
    type: String,
    amount: Number,
  },
};
</script>

<style scoped>
.card {
  background-color: rgb(56, 55, 55);
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.4s ease;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
}

.card__img {
  min-height: 320px;
  object-fit: cover;
  width: 100%;
}

.card__content {
  color: #fff;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.card__title {
  font-weight: 700;
  letter-spacing: 1px;
  color: #2f9c57;
  font-size: 2.4rem;
  flex: 0 0 75%;
}

.card__rating {
  width: 30px;
  text-align: center;
  font-weight: 700;
  color: rgba(38, 112, 29, 0.7);
  background-color: #eaeaeada;
  padding: 0.5rem;
  border-radius: 3px;
}
</style>