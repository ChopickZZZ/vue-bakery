<template>
  <div class="modal modal-container">
    <div class="modal__backdrop" @click="$emit('close')"></div>
    <form class="modal__form" action="#" @submit.prevent="submitForm">
      <div class="modal-accept" v-if="registered">
        <h2 class="modal-accept__title">Вы успешно зарегистрировались</h2>
        <button class="modal-accept__btn" @click.prevent="$emit('close')">
          Закрыть окно
        </button>
      </div>
      <div class="modal__main" v-else>
        <div class="modal__content">
          <h3 class="modal__type">
            {{ mode ? "Войти" : "Зарегистрироваться" }}
          </h3>
          <div
            class="modal__input-container"
            :class="{ invalid: userExist || invalidPassword }"
          >
            <label for="login">Email</label>
            <input
              class="modal__input modal__input--email"
              type="email"
              id="login"
              placeholder="Ваша эл. почта"
              v-model="form.email"
            />
            <small class="modal__invalid" v-if="userExist"
              >Данный email уже зарегестрирован</small
            >
          </div>
          <div
            class="modal__input-container"
            :class="{ invalid: invalidPassword }"
          >
            <label for="password">Пароль</label>
            <input
              class="modal__input modal__input--password"
              type="password"
              id="password"
              placeholder="Ваш пароль"
              v-model="form.password"
            />
            <small class="modal__invalid" v-if="invalidPassword"
              >Логин или пароль неверный</small
            >
          </div>
        </div>
        <div class="modal__buttons">
          <button class="modal__btn--change" @click.prevent="mode = !mode">
            {{ !mode ? "Вход" : "Регистрация" }}
          </button>
          <button class="modal__btn modal__btn--cancel" @click="$emit('close')">
            Отмена
          </button>
          <button type="submit" class="modal__btn modal__btn--submit">
            Подтвердить
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  emits: ["close", "email"],
  data() {
    return {
      mode: false,
      registered: false,
      userExist: false,
      invalidPassword: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  watch: {
    mode() {
      this.userExist = false;
      this.invalidPassword = false;
    },
  },
  computed: {
    isValid() {
      if (this.form.email && this.form.password) {
        this.userExist = false;
        this.invalidPassword = false;
        return true;
      }
      return false;
    },
  },
  methods: {
    submitForm() {
      if (this.isValid) {
        this.mode ? this.signIn() : this.signUp();
      }
    },
    setUserInStorage(user) {
      localStorage.setItem("lastUser", JSON.stringify(user));
    },
    async createUser(user) {
      await fetch(
        "https://bakery-c1e8a-default-rtdb.europe-west1.firebasedatabase.app/users.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );
      this.$store.dispatch("setUser", user);

      this.setUserInStorage(user);
      this.registered = true;
    },
    async signUp() {
      try {
        const dataUser = {
          email: this.form.email,
          password: this.form.password,
        };
        const res = await fetch(
          "https://bakery-c1e8a-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        );
        const data = await res.json();
        if (data) {
          Object.values(data).forEach((user) => {
            if (user.email === dataUser.email) {
              this.userExist = true;
            }
          });
          if (!this.userExist) {
            this.createUser(dataUser);
          }
        } else this.createUser(dataUser);
      } catch (e) {
        console.warn(e.message);
      }
    },
    async signIn() {
      try {
        const res = await fetch(
          "https://bakery-c1e8a-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        );
        const data = await res.json();
        Object.values(data).forEach((user) => {
          if (
            user.email === this.form.email &&
            user.password === this.form.password
          ) {
            this.$store.dispatch("setUser", user);
            this.setUserInStorage(user);
            this.$emit("close");
          } else {
            this.invalidPassword = true;
          }
        });
      } catch (e) {
        console.warn(e.message);
      }
    },
  },
};
</script>

<style scoped>
label {
  margin-bottom: 1rem;
}

.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 100;
}

.modal__backdrop {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  cursor: pointer;
}

.modal__form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc((1100px / 500px) * 100%);
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(7px);
  border: 1px solid #2f9c57;
  padding: 2.5rem 3rem;
  border-radius: 1rem;
  z-index: 1000;
}

.modal__main {
  flex: 1 1 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.modal-accept {
  min-height: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
}

.modal-accept__title {
  font-size: 2.8rem;
  color: #2f9c57;
}

.modal-accept__btn {
  color: inherit;
  letter-spacing: 1px;
  font-weight: 700;
  display: inline-flex;
  padding: 1rem 3.25rem;
  background-color: transparent;
  outline: none;
  border: 1px solid #2f9c57;
  border-radius: 5px;
  transition: 0.35s ease;
  cursor: pointer;
}

.modal__content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.modal__type {
  color: #2f9c57;
  font-size: 2.6rem;
  margin-bottom: 3rem;
}

.modal__input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.modal__input-container.invalid input {
  border: 1px solid red;
}

.modal__input {
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  transition: 0.35s ease;
  margin-bottom: 0.8rem;
}

.modal__input:focus {
  border: 1px solid #000;
}

.modal__invalid {
  color: red;
}

.modal__buttons {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 2rem;
  justify-items: start;
}

.modal__btn--change {
  padding: 0;
  position: relative;
  font-size: 1.8rem;
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  color: inherit;
  outline: none;
  border: none;
  cursor: pointer;
  transition: 0.35s ease;
}

.modal__btn--change::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #fff;
  transition: 0.35s ease;
}

.modal__btn--change:hover::after {
  width: 100%;
}

.modal__btn {
  font-weight: 700;
  min-width: 120px;
  justify-content: center;
  display: inline-flex;
  padding: 0.8rem 1.7rem;
  color: inherit;
  background-color: #fff;
  outline: none;
  border: 1px solid #000;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.35s ease;
}

.modal__btn:hover {
  border-color: #2f9c57;
  background-color: #fff;
  color: #000;
}

.modal__btn--cancel {
  color: #000;
}

.modal-accept__btn:hover,
.modal__btn--cancel:hover {
  background-color: #2f9c57;
}

.modal__btn--submit {
  background-color: #000;
  border: 1px solid #2f9c57;
}

@media (max-width: 768px) {
  .modal-accept {
    min-height: 300px;
    justify-content: space-evenly;
  }
  .modal-accept__title {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .modal__backdrop {
    background-color: rgba(0, 0, 0, 0.9);
  }
  .modal__form {
    padding: 1.5rem 2.25rem;
  }
  .modal-accept {
    min-height: 200px;
  }
  .modal__type {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .modal__input-container {
    margin-bottom: 1.2rem;
  }
  .modal__buttons {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
  .modal__btn--change {
    grid-column-start: 1;
    grid-column-end: 3;
  }
  .modal__btn--cancel {
    grid-column-start: 1;
  }
}
</style>