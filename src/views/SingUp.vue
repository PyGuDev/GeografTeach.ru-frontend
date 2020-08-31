<template>
<div class="container">
	<div class="user_card">
		<h3 id="form-title">Регистрация</h3>
		<form method="POST" @submit.prevent="register">
			<input type="text" name="firstname" id="firstname" placeholder="Фамилия" v-model="first_name"/>
			<input type="text" name="lastname" id="lastname" placeholder="Имя" v-model="last_name"/>
			<input type="email" name="email" id="email" v-model="email" placeholder="Email">
			<select name="classnumber" id="classnumber" v-model="class_number">
				<option disabled value>Выберите номер класса</option>
				<option>5</option>
				<option>6</option>
				<option>7</option>
				<option>8</option>
				<option>9</option>
				<option>10</option>
				<option>11</option>
			</select>
			<input type="password" name="password" id="password" v-model="password1" placeholder="Password">
			<input type="password" name="password" id="password" v-model="password2" placeholder="Password">
			<span>{{error}}</span>
			<input type="submit" value="Регистрация">
		</form>
		<div class="d-flex justify-content-center links" style="color: white">
			У вас есть аккаунт? <a href="" class="ml-2" style="color: #f7ba5b" @click="goTo('SingIn')">Войти</a>
		</div>
	</div>
</div>
</template>
<script>
export default {
	name: "SingUp",
	data(){
			return{
					first_name: '',
					last_name: '',
					class_number: '',
					email: '',
					password1: '',
					password2: '',
					error: ''
			}
	},
	updated(){
		console.log(this.class_number);
	},
	methods:{
		validate(){
			if(this.first_name != '' && this.last_name != '' && this.class_number != ''  && this.password1 != '' && this.password2 != ''){
				if(this.password1 != this.password2){
					this.error = 'Пароли не совпадают'
				}
				else{
					this.error = ''
					return true
				}
			}
			else{
				this.error = 'Заполните все поля'
			}
			return false
		},
		register: function() {
			if(this.validate() != false){
			let data = {
				first_name: this.first_name,
				last_name: this.last_name,
				class_number: this.class_number,
				email: this.email,
				password: this.password1,
			}
			this.$store.dispatch('register', data)
			.then(() => {
				this.$router.push({name: 'Help'})
			})
			.catch(err => this.error="Пользователь с таким email существует")
			}
		},
		goTo(namePath){
			if(this.$router.app._route.name != namePath){
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
  margin-bottom: auto;
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
#form-title{
	color: white;
	align-items: center;
}
form{
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
form input{
	width: 80%;
	outline: none;
	border: none;
	border-radius: 5px;
	margin: 5px;
	padding: 7px;
}
form select{
	width: 80%;
	outline: none;
	border: none;
	border-radius: 5px;
	margin: 5px;
	padding: 7px;
}
form input[type='submit']{
	background-color: rgb(71, 163, 43);
	color: white;
}
form input[type='submit']:hover{
	background-color: rgb(56, 128, 34);
	color: white;
}
span{
	width: 80%;
	color: #ae3823;
}
@media screen and (max-width: 500px){
	.user_card{
		width: 80%;
	}
}
@media screen and (min-width: 1024px){
	.user_card{
		width: 40%;
	}
	form{
		width: 60%;
	}
}
</style>