<template>
  <div class="container-messager">
    <h2 class="title-back"><a href="" @click="goBack()">назад в список тестов</a></h2>
    <h2 class="title-task">Чат</h2>
    <div class="view-message">
      <div v-for="(message, index) in listMessages" :key="index" class="message-list"
           :class="{ message_right: message.type === 'incoming'}">
        <span class="message">{{ message.text }}</span>
      </div>

    </div>
    <div class="submit">
      <input type="text" v-model="textMessage"/>
      <button @click="sendMessage">Отправить</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Chat',
  data() {
    return {
      listMessages: [],
      textMessage: '',
      timerLoadMessage: '',
    }
  },
  created() {
    this.loadMassage()
    this.timerLoadMessage= setInterval(this.loadMassage, 10000)
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title || 'Some Default Title';
      }
    },
  },
  computed: {
  },
  beforeDestroy() {
    clearInterval(this.timerLoadMessage)
  },
  methods: {
    async loadMassage() {
      this.listMessages = await this.$http.get(
          `${this.$store.getters.getServerUrl}/lk/chat/message/`
      ).then(resp => resp.data)
    },
    async sendMessage() {
      let form = {
        text: this.textMessage
      }
      if (form.text !== '')
        await this.$http({
          url: `${this.$store.getters.getServerUrl}/lk/chat/message/create/`,
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          data: form
        }).then(resp => {
          var data = resp.data;
          data.type = 'incoming';
          console.log(data)
          this.listMessages.push(data);
          this.textMessage = '';
        })
    },
    goBack() {
      this.$router.push({name: 'Lk'})
      this.path = 'Lk'
    },

  }
}
</script>
<style scoped>
.container-messager {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
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

.view-message {
  width: 100%;
  background: white;
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  border: 1px solid #C1C1C1;
  overflow-x: scroll;
  overflow-y: scroll;
  height: 600px;
}

.message-list {
  background: rgb(190, 190, 190);
  width: 30%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  font-family: "Helvetica Neue", Helvetica, sans-serif;
  margin-left: 20px;
}

.message_right {
  align-self: flex-end !important;
  background: rgb(7, 112, 197);
  color: white;
  margin-right: 20px;
  margin-left: 0 !important;
}

.message {
  width: 100%;
}

.submit {
  width: 100%;
  display: flex;
}

.submit input {
  width: 80%;
  padding: 8px;

}

.submit button {
  width: 20%;
}

@media screen and (max-width: 1200px) {
  .view-message {
    padding-top: 20px;
  }
}

@media screen and (max-width: 800px) {
  .container-messager {
    width: 100%;
  }

  .view-message {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .message-list {
    width: 45%;
  }

  .submit {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }
}

@media screen and (max-width: 400px) {
  .view-message {
    width: 96%;
    margin-left: auto;
    margin-right: auto;
  }

  .message-list {
    width: 80%;
    align-self: flex-end;
  }

  .message_right {
    align-self: flex-start !important;
  }
}
</style>