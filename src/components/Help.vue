<template>
    <div class="container">
    <div class="block-content">
            <div class="row-help">
                <div class="col">
                    <h3>Вам отправили письмо для подтвержения аккаунта</h3>
                    <h4>Перейдите на свою электронную почту</h4>
                    <a href="" @click="goTo('SingIn')">Авторизация</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Help",
    methods:{
        goTo(namePath){
            if(this.$router.app._route.name != namePath){
                this.$router.push({name: namePath})
                this.path = namePath
            }
        },
    }
}
</script>
<style>
    .container{
        width: 98%;
        display: block;
    }
    .block-content{
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        align-items: center;
        width: 70%;
        padding: 10px;
    }
    .row-help{
        display: flex;
        justify-content: center;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 20px;
    }
</style>