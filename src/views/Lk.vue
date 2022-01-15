<template>
  <div class="block-content-lk">
    <div class="header-lk">
      <div class="container-lk">
        <div class="lk-inform">
          <h2 class="title-lk">Личный кабинет</h2>
          <div class="inform">
            <div class="names">
              <span>Фамилия: {{ user.first_name }}</span>
              <span>Имя: {{ user.last_name }}</span>
            </div>
            <div class="other">
              <span>Класс: {{ user.class_number }}</span>
              <span>Email: {{ user.email }}</span>
            </div>
            <div class="counts">
              <span>Количество заданий: {{ listTask.length }}</span>
              <span>Количество выполненых: {{ countAnswers }}</span>
            </div>
            <div class="test-link">
              <a href='' @click="goToTest">Тесты</a>
            </div>
            <div class="chat-link"><a href='' @click="goToChat">Написать учителю</a></div>
          </div>
        </div>
        <div class="task">
          <h2 class="title-task">Задания</h2>
          <div class="task-overflow">
            <div class="row-task" v-for="task in listTask" :key=task.id>
              <div class="header-task">
                <h3>{{ task.title }}</h3>
                <span>Для {{ task.class_student }} класса</span>
              </div>
              <div class="description">
                <p>{{ task.description.substring(0, 300) }}</p>
              </div>
              <div class="date">
                <span>Дата сдачи: {{ task.date }}</span>
              </div>
              <div class="answer" v-if="task.answer">
                <div class="date">
                  <span>Дата выполнения: {{ task.answer.created_at }}</span>
                </div>
                <div class="date">
                  <span>Оценка: {{ task.answer.estimation }}</span>
                </div>
              </div>
              <button @click="goToTask(task.id)">Подробнее</button>
              <span class="performed" :class="{'active-done': !!task.answer}">Выполнено</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Lk",
  data() {
    return {
      user: [],
      listTask: [],
      countAnswers: 0,
    }
  },
  created() {
    this.isAuthenticated(),
        this.getUser(),
        this.loadListTask()
    // this.loadListAnswer()
  },
  methods: {
    async getUser() {
      this.user = await this.$http.get(
          `${this.$store.getters.getServerUrl}/user/profile/`,
      ).then(resp => resp.data)
      localStorage.setItem('id', this.user.id)
      localStorage.setItem('user', this.user.email)
    },
    async loadListTask() {
      this.listTask = await this.$http.get(
          `${this.$store.getters.getServerUrl}/lk/task/`
      ).then(resp => resp.data)
      this.counterAnswers();
    },
    getUserId() {
      return this.$store.getters.getUserId
    },
    goToTask(id) {
      this.$router.push({name: 'Task', params: {id: id}})
      this.path = 'Task'
    },
    goToChat() {
      this.$router.push({name: 'Chat'})
      this.path = 'Chat'
    },
    goToTest() {
      this.$router.push({name: 'Test'})
      this.path = 'Test'
    },
    counterAnswers(){
      var count = 0;
      for(var item in this.listTask){
        if(this.listTask[item].answer){
          count ++;
        }
      }
      this.countAnswers = count;
    },
    isAuthenticated() {
      setTimeout(() => {
        if (!this.$store.getters.isLoggedIn) {
          this.goToSignIn()
        }
      }, 300);
    },
    goToSignIn() {
      this.$router.push({name: 'SingIn'})
      this.path = 'SingIn'
    }
  }


}
</script>

<style>
.block-content-lk {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  width: 90%;
  margin-bottom: 300px;
}

.header-lk {
  background: white;
  display: block;
  padding-bottom: 20px;
}

.header-title {
  display: flex;
  width: 100%;
}

.title-lk {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: rgb(219, 219, 219);
  padding: 10px 0 10px 0;
  margin: 0;
  width: 100%;
  text-align: center;
}

.title-task {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: rgb(219, 219, 219);
  padding: 10px 0 10px 0;
  margin: 0;
  width: 100%;
  text-align: center;
}

.inform {
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.names {
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: column;
}

.names span {
  margin-top: 5px;
}

.other {
  display: flex;
  flex-direction: column;
}

.other span {
  margin-top: 5px;
}

.counts {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.counts span {
  margin-top: 6px;
}

.container-lk {
  display: flex;
  justify-content: center;
  align-self: center;
}

.chat-link, .test-link {
  margin-top: 10px;
}

.chat-link a, .test-link a {
  text-decoration: none;
  color: rgb(85, 85, 85);
}

.chat-link a:hover, .test-link a:hover {
  color: rgb(134, 134, 134);
}

.lk-inform {
  width: 35%;
}

.task {
  width: 70%;
  font-family: Arial, Helvetica, sans-serif;
  display: block;
}

.task-overflow {
  height: 450px;
  background: rgb(235 235 235);
  border: 1px solid #C1C1C1;
  overflow-x: scroll;
  overflow-y: scroll;
}

.row-task {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  border: 1px solid gray;
  padding: 10px;
  background: #fff;
}

.row-task button {
  margin-top: 10px;
  background-color: #a3a3a3;
  border: 0;
  color: white;
  padding: 7px;
  border-radius: 5px;
}

.row-task button {
  margin-top: 10px;
  background-color: #a3a3a3;
  border: 0;
  color: white;
  padding: 7px;
  border-radius: 5px;
}

.row-task button:hover {
  background-color: #7e7e7e;
}

.performed {
  display: none;
  color: green;
  align-self: flex-end;
  margin-right: 10px;
}

.active-done {
  display: block;
}

.header-task {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.answer {
  margin-top: 10px;
  text-align: center;
}
.answer div{
  margin-bottom: 5px;
}

@media screen and (max-width: 900px) {
  .container-lk {
    flex-direction: column;
    align-items: center;
  }

  .lk-inform {
    align-items: flex-start;
    width: 90%;
  }

  .task {
    width: 90%;
  }
}
</style>