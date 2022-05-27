<template>
  <div class="info">
    <div class="container">
      <div class="info__img">
        <img :src="bakeryProduct.url" alt="cake" />
      </div>
      <h1 class="info__title">{{ bakeryProduct.title }}</h1>
      <ul class="info__ingredients" v-if="bakeryProduct.ingredients.length > 0">
        <h2 class="info__sub-title">Ингредиенты</h2>
        <li
          class="info__ingredient"
          v-for="ingredient in bakeryProduct.ingredients"
          :key="ingredient"
        >
          {{ ingredient }}
        </li>
      </ul>
      <h2 class="info__sub-title" v-if="bakeryProduct.recipe.length > 0">
        Рецепт
      </h2>
      <p class="info__recipe">
        {{ bakeryProduct.recipe }}
      </p>
      <bakery-comments></bakery-comments>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { categories } from "../assets/bakery";
import BakeryComments from "./BakeryComments.vue";
export default {
  mounted() {
    this.$store.dispatch(
      "setUser",
      JSON.parse(localStorage.getItem("lastUser"))
    );
  },
  created() {
    const bakery = this.$route.params.bakery;
    const bakeryProduct = categories[bakery].find(
      (item) => item.link === this.$route.params.info
    );
    if (bakeryProduct) {
      this.bakeryProduct = bakeryProduct;
    }
  },
  data() {
    return {
      bakeryProduct: null,
    };
  },
  components: { BakeryComments },
};
</script>

<style scoped>
.info {
  padding: 3rem 0;
}

.info__img {
  max-width: 100%;
  max-height: 500px;
  overflow: hidden;
  margin-bottom: 3rem;
  border-radius: 10px;
}

.info__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info__title {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.info__sub-title {
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  color: #2f9c57;
}

.info__ingredients {
  margin-bottom: 4rem;
}

.info__ingredient {
  position: relative;
  font-size: 1.6rem;
}

.info__ingredient::first-letter {
  text-transform: capitalize;
}

.info__ingredient::after {
  content: "";
  position: absolute;
  width: 60%;
  height: 1px;
  left: 0;
  bottom: -11px;
  background-color: #fff;
  opacity: 0.75;
}

.info__ingredient:nth-child(odd)::after {
  background-color: #2f9c57;
}

.info__ingredient:not(:last-child) {
  margin-bottom: 2rem;
}

.info__recipe {
  font-size: 1.6rem;
  margin-bottom: 4.5rem;
  line-height: 1.5;
}

@media (max-width: 510px) {
  .info__img {
    margin-bottom: 1.5rem;
  }

  .info__title {
    margin-bottom: 4.5rem;
  }

  .info__title,
  .info__sub-title {
    text-align: center;
  }
  .info__recipe {
    text-align: center;
  }
  .info__ingredients {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 5rem;
  }
  .info__ingredient {
    display: block;
    text-align: center;
  }
  .info__ingredient::after {
    width: 100%;
  }
}
</style>