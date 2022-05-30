<template>
  <bakery-header @changeValue="change"></bakery-header>
  <bakery-main ref="childComponent"></bakery-main>
</template>

<script>
/* eslint-disable */
import BakeryHeader from "./BakeryHeader.vue";
import BakeryMain from "./BakeryMain.vue";

export default {
  components: { BakeryHeader, BakeryMain },
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