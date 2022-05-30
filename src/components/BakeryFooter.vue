<template>
  <div class="footer">
    <div class="container">
      <div class="contacts">
        <h2 class="contacts__title">Контакты:</h2>
        <ul class="contacts__list">
          <li class="contacts__link">
            <a target="_blank" href="https://vk.com/skipidar4ik">Вконтакте</a>
          </li>
          <li class="contacts__link">
            <a
              href="https://vk.com/away.php?to=https%3A%2F%2Fwww.instagram.com%2Finvites%2Fcontact%2F%3Fi%3Deuthawu9k6li%26utm_content%3D2pn5f1u&cc_key="
              target="_blank"
              >Инстаграм</a
            >
          </li>
          <li class="contacts__link">
            <a href="https://t.me/vuebakery" target="_blank">Телеграм</a>
          </li>
          <li class="contacts__link">
            <a href="https://vk.com/vuebakery" target="_blank">Группа</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {};
</script>

<style scoped>
.footer {
  padding: 5.5rem 0 3rem 0;
}

.contacts {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contacts__title {
  flex: 0 1 35%;
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #2f9c57;
}

.contacts__list {
  flex: 0 1 65%;
  display: flex;
  justify-content: space-between;
}

.contacts__link {
  font-size: 2rem;
  transition: 0.3s ease;
}

.contacts__link:hover {
  color: #2f9c57;
}
@media (max-width: 510px) {
  .footer {
    padding: 3rem 0;
  }
  .contacts {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .contacts__title {
    flex: 0 1 25%;
  }
  .contacts__list {
    flex: 0 1 75%;
    gap: 1.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>