<template>
  <div class="comments">
    <h2 class="comments__title">Комментарии</h2>
    <form class="comments__form" action="#" @submit.prevent="addComment">
      <textarea
        class="comments__area"
        placeholder="Написать комментарий"
        v-model="comment"
      ></textarea>
      <button class="comments__btn" type="submit">Опубликовать</button>
    </form>
    <ul class="comments-body" v-if="comments.length > 0">
      <li
        class="comments-body__comment"
        v-for="comment in comments"
        :key="comment.id"
      >
        <div class="comments-body__email">{{ comment.email }}</div>
        <small class="comments-body__date">{{ comment.date }}</small>
        <p class="comments-body__text">{{ comment.content }}</p>
        <button
          class="comments-body__delete-btn"
          @click="removeComment(comment.id)"
          v-if="$store.state.user.email === comment.email"
        >
          Удалить комментарий
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  mounted() {
    this.loadComments();
  },
  data() {
    return {
      comments: [],
      comment: "",
    };
  },
  methods: {
    async addComment() {
      try {
        if (this.comment.length) {
          const commentObj = {
            id: Math.random(),
            email: this.$store.state.user.email,
            content: this.comment,
            date: new Date().toLocaleString("ru"),
            bakeryType: this.$route.params.info,
          };
          this.comments.push(commentObj);
          await fetch(
            "https://bakery-c1e8a-default-rtdb.europe-west1.firebasedatabase.app/comments.json",
            {
              method: "POST",
              headers: {
                "Content-type": "application/JSON",
              },
              body: JSON.stringify(commentObj),
            }
          );
        }
        this.comment = "";
      } catch (e) {
        console.warn(e.message);
      }
    },
    async loadComments() {
      try {
        const response = await fetch(
          "https://bakery-c1e8a-default-rtdb.europe-west1.firebasedatabase.app/comments.json"
        );
        const data = await response.json();
        Object.values(data).forEach((obj) => {
          if (obj.bakeryType === this.$route.params.info) {
            this.comments.push(obj);
          }
        });
      } catch (e) {
        console.warn("No comments to load");
      }
    },
    async removeComment(id) {
      this.comments = this.comments.filter((com) => com.id !== id);
      const response = await fetch(
        "https://bakery-c1e8a-default-rtdb.europe-west1.firebasedatabase.app/comments.json"
      );
      const data = await response.json();
      const [key] = Object.entries(data).find((key) => key[1].id === id);
      await fetch(
        `https://bakery-c1e8a-default-rtdb.europe-west1.firebasedatabase.app/comments/${key}.json`,
        {
          method: "DELETE",
        }
      );
    },
  },
};
</script>

<style scoped>
.comments {
  display: flex;
  flex-direction: column;
  max-width: 700px;
}

.comments__title {
  color: #2f9c57;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.comments__form {
  position: relative;
  display: flex;
}

.comments__area {
  background-color: #eaeaea;
  line-height: 1.4;
  color: #555;
  font-size: inherit;
  font-weight: 700;
  flex: 0 1 100%;
  height: 200px;
  padding: 1.5rem;
  border: 2px solid #18492a;
  border-radius: 7px;
  resize: none;
  outline: none;
}

.comments__area::placeholder {
  font-size: 1.5rem;
}

.comments__btn {
  position: absolute;
  font-weight: 700;
  left: 2rem;
  bottom: 2rem;
  display: inline-flex;
  background-color: #2f9c57;
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
}

.comments__btn:hover {
  background-color: #18492a;
}

.comments-body__comment {
  border: 2px solid #1c6637;
  border-radius: 7px;
  overflow: hidden;
  padding: 1.5rem;
  display: grid;
  justify-items: start;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  column-gap: 10px;
  row-gap: 20px;
}

.comments-body__comment:not(:last-child) {
  margin-bottom: 20px;
}

.comments-body__btn {
  font-weight: 700;
  letter-spacing: 1px;
  display: inline-flex;
  padding: 1rem 2.5rem;
  background-color: transparent;
  border: 1px solid #1c6637;
  border-radius: 5px;
  color: #fff;
  justify-self: center;
  cursor: pointer;
  transition: background 0.3s ease;
}

.comments-body__delete-btn {
  display: inline-flex;
  letter-spacing: 1px;
  justify-content: center;
  padding: 1rem 2rem;
  color: inherit;
  border: 1px solid #2f9c57;
  border-radius: 5px;
  background-color: #000;
  cursor: pointer;
  transition: 0.3s ease;
  grid-column-start: 1;
  grid-column-end: 3;
}

.comments-body__btn:hover,
.comments-body__delete-btn:hover {
  background-color: #2f9c57;
}

.comments-body__date {
  font-size: 1.2rem;
  color: #eaeaea;
}

.comments-body__text {
  grid-column-start: 1;
  grid-column-end: 4;
}

@media (max-width: 510px) {
  .comments__title {
    text-align: center;
  }
  .comments__btn {
    left: 50%;
    transform: translate(-50%, 0);
  }
  .comments__area,
  .comments__area::placeholder,
  .comments-body__text {
    font-size: 1.4rem;
  }
}
</style>