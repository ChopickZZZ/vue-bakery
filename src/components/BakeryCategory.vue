<template>
  <bakery-header @changeValue="filter"></bakery-header>
  <div class="categories">
    <div
      class="container container--small"
      :class="{ centered: recipes.length === 0 }"
    >
      <h1 class="main-title" v-if="recipes.length > 0">Выберите рецепт</h1>
      <div class="element__container" v-if="recipes.length > 0">
        <div class="element" v-for="recipe in recipes" :key="recipe">
          <router-link
            :to="{ name: 'info', params: { bakery: type, info: recipe.link } }"
            class="element__img"
          >
            <img :src="recipe.url" alt="cake" />
          </router-link>
          <h2
            class="element__title"
            :style="{
              'background-image': `linear-gradient(to right, ${card.color}, rgba(0, 0, 0, 0)`,
            }"
          >
            {{ recipe.title }}
          </h2>
        </div>
      </div>
      <h3 class="empty" v-else>Нет результатов поиска</h3>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { cards } from "../assets/bakery";
import { categories } from "../assets/bakery";
import BakeryHeader from "./BakeryHeader.vue";
export default {
  mounted() {
    this.recipes = categories[this.type];
  },
  data() {
    return {
      type: this.$route.params.bakery,
      recipes: [],
      cards,
    };
  },
  methods: {
    filter(value) {
      this.recipes = categories[this.type].filter((recipe) =>
        recipe.title.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
  computed: {
    card() {
      return this.cards.find((card) => card.type === this.type);
    },
  },
  components: { BakeryHeader },
};
</script>

<style scoped>
.categories {
  padding: 5rem 0 5rem 0;
}

.main-title {
  font-size: 2.8rem;
  padding-bottom: 3rem;
}

.element__container {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  gap: 3rem;
}

.element {
  flex: 1 1 500px;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  border-radius: 5px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  transition: 0.4s ease;
  overflow: hidden;
  filter: grayscale(0.1);
  cursor: pointer;
}

.element:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);
  filter: grayscale(0);
}

.element__img {
  flex: 0 1 100%;
}

.element__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.element__title {
  font-size: 2rem;
  position: absolute;
  width: 100%;
  padding: 3.5rem 1rem;
  bottom: 0;
  left: 0;
}

@media (max-width: 768px) {
  .categories {
    padding: 5rem 0 2rem 0;
  }
  .element {
    flex: 0 1 400px;
  }
}

@media (max-width: 510px) {
  .main-title {
    font-size: 2.4rem;
    text-align: center;
  }

  .element {
    flex: 0 1 250px;
  }

  .element__title {
    font-size: 1.6rem;
    padding: 1.8rem 1rem;
  }
}
</style>