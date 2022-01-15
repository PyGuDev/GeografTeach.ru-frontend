<template>
  <div class="container">
    <div class="user_card">
      <h3 id="form-title">Войти</h3>
      <form method="POST" @submit.prevent="login">
        <input type="email" name="email" id="email" v-model="email" placeholder="Email">
        <input type="password" name="password" id="password" v-model="password" placeholder="Password">
        <span>{{ error }}</span>
        <input type="submit" value="Вход">
      </form>
      <div class="d-flex justify-content-center links" style="color: white">
        У вас есть аккаунт? <a href="" class="ml-2" style="color: #f7ba5b" @click="goTo('SingUp')">Регистрация</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingUp",
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  updated() {
    console.log(this.class_number);
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
    validate() {
      if (this.email != '' && this.password != '') {
        this.error = ''
      } else {
        this.error = 'Заполните все поля'
        return false
      }
    },
    login: function () {
      if (this.validate() != false) {
        let email = this.email
        let password = this.password
        this.$store.dispatch('login', {email, password})
            .then(() => {
              this.$router.push({name: 'Lk'})
            })
            .catch(err => this.error = 'Неверный логин или пароль')
      }
    },
    goTo(namePath) {
      if (this.$router.app._route.name != namePath) {
        this.$router.push({name: namePath})
        this.path = namePath
      }
    },


  }
}
</script>

<style scoped>
.user_card {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  margin-bottom: 200px;
  background: #429fef;
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
  0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
  0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
}

#form-title {
  color: white;
  align-items: center;
}

form {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

form input {
  width: 80%;
  outline: none;
  border: none;
  border-radius: 5px;
  margin: 5px;
  padding: 7px;
}

form input[type='submit'] {
  background-color: rgb(71, 163, 43);
  color: white;
}

form input[type='submit']:hover {
  background-color: rgb(56, 128, 34);
  color: white;
}

span {
  width: 80%;
  color: #ae3823;
}

@media screen and (max-width: 500px) {
  .user_card {
    width: 80%;
  }
}

@media screen and (min-width: 1024px) {
  .user_card {
    width: 40%;
  }

  form {
    width: 60%;
  }
}
</style>