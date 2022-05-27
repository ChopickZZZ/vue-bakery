<template>
  <header class="header">
    <div class="container">
      <bakery-modal
        v-if="auth"
        :class="{
          active: auth,
        }"
        @close="modalClose"
      ></bakery-modal>
      <div class="header__inner header__inner-left">
        <router-link class="header__logo" to="/">Пирожок</router-link>
        <div class="header__input">
          <input
            class="header__filter"
            type="text"
            placeholder="Поиск"
            v-model="value"
            @input="$emit('changeValue', value)"
          />
          <font-awesome-icon class="header__search" icon="search" />
        </div>
      </div>
      <div class="header__inner header__inner-right">
        <h3 class="header__username">{{ username }}</h3>
        <button class="header__auth" @click="authentificate">
          {{ isEntrance }}
        </button>
      </div>
    </div>
  </header>
</template>

<script>
/* eslint-disable */
import BakeryModal from "./BakeryModal.vue";
export default {
  emits: ["changeValue"],
  data() {
    return {
      auth: false,
      value: "",
      btnValue: true,
    };
  },
  mounted() {
    this.loadUser();
  },
  computed: {
    username() {
      if (this.$store.state.user) {
        return this.$store.state.user.email;
      }
      return "";
    },
    isEntrance() {
      return this.$store.state.user ? "Выход" : "Вход";
    },
  },
  methods: {
    modalClose() {
      this.auth = false;
      document.body.style.overflow = "auto";
    },
    authentificate() {
      if (this.$store.state.user) {
        this.$store.dispatch("removeUser");
        localStorage.removeItem("lastUser");
        this.auth = false;
      } else {
        this.auth = true;
        document.body.style.overflow = "hidden";
      }
    },
    async loadUser() {
      const user = JSON.parse(localStorage.getItem("lastUser"));
      this.$store.dispatch("setUser", user);
    },
  },
  components: { BakeryModal },
};
</script>

<style scoped>
.header {
  padding: 3rem 0;
  background-color: #333;
}

.header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header__logo {
  font-weight: 700;
  font-size: 1.8rem;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.3s ease;
}

.header__logo:hover {
  color: #2f9c57;
}

.header__input {
  position: relative;
}

.header__search {
  font-size: 1.8rem;
  color: #2f9c57;
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translate(0, -50%);
}

.header__inner {
  flex: 1 1 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header__inner-right {
  justify-content: end;
}

.header__username {
  color: #2f9c57;
  font-size: 1.8rem;
}

.header__auth {
  color: inherit;
  font-weight: 700;
  letter-spacing: 1px;
  display: inline-flex;
  padding: 1.25rem 4rem;
  background-color: transparent;
  border-radius: 10px;
  outline: none;
  border: 1px solid #2f9c57;
  cursor: pointer;
  transition: 0.35s ease;
}

@media (any-hover: hover) {
  .header__auth:hover {
    color: #000;
    background-color: #2f9c57;
  }
}

.header__filter {
  flex: 0 1 250px;
  display: inline-flex;
  padding: 1rem 2rem;
  background-color: transparent;
  border: 2px solid #fff;
  border-radius: 50px;
  color: #fff;
}

@media (max-width: 1024px) {
  .header {
    padding: 2.5rem 0 0 0;
  }
}

@media (max-width: 650px) {
  .header {
    padding: 2rem 0 0 0;
  }
  .header .container {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }
  .header__filter {
    flex: 0 1 95%;
  }
  .header__inner {
    justify-content: space-between;
  }
}
</style>