<template>
  <main class="page">
    <div class="container" :class="{ centered: filtered.length === 0 }">
      <div class="row" v-if="filtered.length > 0">
        <bakery-card
          v-for="card in filtered"
          :key="card"
          :src="card.url"
          :title="card.title"
          :type="card.type"
          :amount="card.amount"
        ></bakery-card>
      </div>
      <h3 class="empty" v-else>Нет результатов поиска</h3>
    </div>
  </main>
</template>

<script>
/* eslint-disable */
import { cards } from "../assets/bakery";
import BakeryCard from "./BakeryCard.vue";
export default {
  mounted() {
    this.filtered = this.cards;
  },
  data() {
    return {
      filtered: [],
      cards,
    };
  },
  methods: {
    filter(value) {
      this.filtered = this.cards.filter((card) =>
        card.title.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
  components: { BakeryCard },
};
</script>

<style scoped>
.page {
  padding: 5rem 0 0 0;
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 0.5fr));
  grid-template-rows: auto;
  justify-content: center;
  gap: 2%;
}

@media (max-width: 768px) {
  .row {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    row-gap: 1%;
  }
}

@media (max-width: 510px) {
  .page {
    padding-bottom: 2rem;
  }
  .row {
    row-gap: 2rem;
  }
}
</style>