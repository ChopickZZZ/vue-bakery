<template>
  <bakery-header @changeValue="change"></bakery-header>
  <bakery-main ref="childComponent"></bakery-main>
  <bakery-footer></bakery-footer>
</template>

<script>
/* eslint-disable */
import BakeryHeader from "./BakeryHeader.vue";
import BakeryMain from "./BakeryMain.vue";
import BakeryFooter from "./BakeryFooter.vue";

export default {
  components: { BakeryHeader, BakeryMain, BakeryFooter },
  data() {
    return {
      searchValue: "",
    };
  },
  methods: {
    change(value) {
      this.$refs.childComponent.filter(value);
    },
  },
};
</script>