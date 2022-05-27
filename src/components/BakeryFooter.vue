<template>
  <div class="footer">
    <div class="container">
      <div class="contacts">
        <h2 class="contacts__title">Контакты:</h2>
        <ul class="contacts__list">
          <li class="contacts__link">
            <a target="_blank" href="https://vk.com/skipidar4ik">Вконтакте</a>
          </li>
          <li class="contacts__link"><a href="#">Телеграм</a></li>
          <li class="contacts__link"><a href="#">Инстаграм</a></li>
          <li class="contacts__link"><a href="#">Почта</a></li>
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
  padding: 5rem 0;
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
</style>