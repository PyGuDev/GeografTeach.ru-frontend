<template>
  <div class="block-content-task">
    <h2 class="title-back"><a href="" @click="goBack()">назад в личный кабинет</a></h2>
    <h2 class="title-task">Тесты</h2>
    <div class="test-list">
      <div class="test-item" v-for="test in tests" :key="test.uid">
        <h3>{{ test.title }}</h3>
        <div class="duration">Время на выполнение {{ test.duration_session }}</div>
        <div class="expired" v-if="test.expiry_date"> Сделать до: {{ test.expiry_date }}</div>
        <div class="result" v-if="test.result">
            <div class="result-item">Время начал: {{test.result.start_time}}</div>
            <div class="result-item" v-if="test.result.end_time">
              Время завершения: {{test.result.end_time}}
            </div>
            <div class="result-item" v-else>
              Тест начат
            </div>
            <div class="result-item" v-if="test.result.result">Результат: {{test.result.result}}%</div>
        </div>
        <div class="start">
          <button v-if="test.result" class="start-btn" @click="startSession(test.uid)">К результатам</button>
          <button v-else class="start-btn" @click="startSession(test.uid)">Начать тест</button>
        </div>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      tests: {},
      answer: {},
    }
  },
  created() {
    this.loadTest()
  },
  methods: {
    async loadTest() {
      this.tests = await this.$http.get(
          `${this.$store.getters.getServerUrl}/lk/test/`
      ).then(resp => resp.data);
    },
    goBack() {
      this.$router.push({name: 'Lk'})
      this.path = 'Lk'
    },
    startSession(id) {
      this.$router.push({name: 'TestSession', params: {testId: id}})
      this.path = 'TestSession'
    },
  }
}
</script>

<style scoped>
.block-content-task {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  width: 90%;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin-bottom: 50px;
}

.title-back {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: #79aec8;
  padding: 10px 0 10px 0;
  margin: 0;
  width: 100%;
  text-align: center;
}

.title-back a {
  color: white;
}

.title-task {
  background: #79aec8;
  color: white;
}

.test-list {
  text-align: center;
  padding-bottom: 20px;
  overflow: scroll;
  height: 700px;
}

.result {
  margin-top: 10px;
}

.result-item {
  margin-bottom: 10px;
}

.duration {
  margin-bottom: 10px;
}

.start {
  margin-top: 10px;
}

.start-btn {
  background-color: rgb(54 164 237);
  color: white;
  font-weight: bold;
  padding: 7px;
  border-radius: 5px;
  border: none
}

.start-btn:hover {
  background-color: rgb(35 123 181);
  cursor: pointer;
}

</style>