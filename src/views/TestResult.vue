<template>
  <div class="block-content-task">
    <h2 class="title-back"><a href="" @click="goBack()">назад в список тестов</a></h2>
    <h2 class="title-task">Результат прохождения теста</h2>
    <div class="test-result">
      <h3>{{ result.test.title }}</h3>
      <h5>Врем на тест: {{ result.test.duration_session }}</h5>
      <div class="result">
        <span v-bind:class="classScore">Результат: {{ result.result }}%</span><br><br>
        <span class="result-item">Время начала: {{ result.start_time }}</span><br><br>
        <span class="result-item">Время завершения: {{ result.end_time }}</span><br><br>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestResult",
  props: ["sessionId", "testId"],
  data() {
    return {
      result: {}
    }
  },
  created() {
    this.getResult()
  },
  computed: {
    classScore: function () {
      return {
        score: true,
        great: this.result.result > 75.0,
        good: this.result.result > 50.0 && this.result.result <= 75.0,
        passably: this.result.result > 25.0 && this.result.result <= 50,
        bad: this.result.result <= 25.0
      }
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Some Default Title';
      }
    },
  },
  methods: {
    async getResult() {
      let response = await this.$http.get(
          `${this.$store.getters.getServerUrl}/lk/test/${this.testId}/session/${this.sessionId}/result`
      ).then(resp => resp);
      this.result = response.data;
    },
    goBack() {
      this.$router.push({name: 'Test'})
      this.path = 'Test'
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

.test-result {
  text-align: center;
  padding-bottom: 20px;
}
.score {
  border-radius: 10px;
  padding: 5px;
  color: white;
}
.score.great {
  background-color: green;
}

.score.good {
  background-color: green;
}

.score.passably {
  background-color: #e77500;
}

.score.bad {
  background-color: red;
}
</style>