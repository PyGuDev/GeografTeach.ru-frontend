<template>
  <div class="block-content-task">
    <h2 class="title-back"><a href="" @click="goBack()">назад в список тестов</a></h2>
    <h2 class="title-task">Вопросы</h2>
    <h4 class="title-task" id="expire"></h4>
    <div class="test-list" v-for="question in questions" :key="question.id">
      <h3>{{ question.question }}</h3>
      <img :src="question.image">
      <div class="block-answers">
        <div class="answer" v-for="answer in question.answers" :key="answer.id">
          <button class="btn-answer" :id="answer.id" @click="checkedButton(question.id, answer.id, $event)">
            {{ answer.answer }}
          </button>
        </div>
      </div>
      <hr>
    </div>
    <div class="send">
      <span class="error-msg">{{ errorMsg }}</span><br>
      <button class="btn-send" @click="sendData">Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TestSession',
  props: ['testId'],
  data() {
    return {
      questions: {},
      userAnswers: {},
      errorMsg: '',
      sessionUrl: '',
      expire: 0,
      timerId: 0
    }
  },
  created() {
    this.getQuestions()
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
    goBack() {
      this.$router.push({name: 'Test'})
      this.path = 'Test'
    },

    goToResult(sessionId) {
      this.$router.push({name: 'TestResult', params: {testId: this.testId, sessionId: sessionId}})
      this.path = 'TestResult'
    },

    async getQuestions() {
      let response = await this.$http.post(
          `${this.$store.getters.getServerUrl}/lk/test/${this.testId}/session`
      ).then(resp => resp);
      if (Array.isArray(response.data)) {
        this.questions = response.data;
        this.sessionUrl = response.request.responseURL;
        await this.getExpireAt();
      } else {
        let sessionId = response.data.id
        this.goToResult(sessionId);
      }
    },

    async getExpireAt() {
      let response = await this.$http.get(
          `${this.sessionUrl}/time`
      ).then(resp => resp.data);
      this.expire = new Date(response.expired_at * 1000);
      this.timerId = this.startTimer(this.expire);
    },

    checkedButton(questionId, answerId, event) {
      event.target.className += ' clicked';
      if (this.errorMsg) {
        this.errorMsg = '';
      }
      if (this.userAnswers[questionId]) {
        let lastAnswerId = this.userAnswers[questionId];
        let lastButtonChecked = document.getElementById(lastAnswerId.toString());
        if (lastAnswerId != answerId) {
          lastButtonChecked.className = 'btn-answer';
        }

      }
      this.userAnswers[questionId] = answerId;
    },

    async sendData() {
      if (Object.keys(this.userAnswers).length > 0) {
        let data = this.prepareDate();
        let raw_list_url = this.sessionUrl.split('/');
        let response = await this.$http.post(
            `${this.sessionUrl}/result`,
            data
        ).then(resp => resp);
        if (response.status === 200) {
          let raw_list_url = this.sessionUrl.split('/');
          clearInterval(this.timerId);
          this.goToResult(raw_list_url[raw_list_url.length - 1]);
        }
      } else {
        this.errorMsg = 'Выберите ответы'
      }
    },

    prepareDate() {
      let keys = Object.keys(this.userAnswers)
      let data = []
      for (let val in keys) {
        data.push({'question': parseInt(keys[val]), 'answer': this.userAnswers[keys[val]]});
      }
      return data
    },
    startTimer(expire) {
      let sendData = this.sendData;
      let intervalId = setInterval(function () {
        let now = new Date();
        this.expire = expire.getTime() - now.getTime();
        var days = Math.floor(this.expire / (1000 * 60 * 60 * 24));
        var hours = Math.floor((this.expire % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((this.expire % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((this.expire % (1000 * 60)) / 1000);
        let expireStr = hours + "ч " + minutes + "м " + seconds + "с ";
        let expireElement = document.getElementById('expire');
        expireElement.innerHTML = 'Осталось: ' + expireStr;
        if (this.expire < 0) {
          sendData().then();
          let expireStr = 0 + "ч " + 0 + "м " + 0 + "с ";
          clearInterval(intervalId);
        }
      }, 1000);
      return intervalId;
    }
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
}

.block-answers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.answer {
  margin: 10px;
  width: 200px;
  align-items: center;
}

.btn-answer {
  background: #429fef;
  border: none;
  border-radius: 7px;
  padding: 10px;
  width: 150px;
  color: white;
}

.btn-answer:hover {
  background: #337ab7;
}

.btn-answer.clicked {
  background: #337ab7;
}

.send {
  width: 100%;
  display: flex;
  flex-flow: column;
  padding-bottom: 20px;
}

.btn-send {
  background: #00a800;
  border: none;
  border-radius: 7px;
  padding: 10px;
  width: 150px;
  color: white;
  margin-left: auto;
  margin-right: auto;
}

.error-msg {
  margin-left: auto;
  margin-right: auto;
  color: red;
}
</style>