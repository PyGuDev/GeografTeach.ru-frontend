<template>
    <div class="container-messager">
        
        <div class="view-message">
            <div v-for="(message, index) in listMessages" :key="index" class="message-list" :class="{ message_right: message.author}">
                <span class="message" v-if="message.author">{{message.text}}</span>
                <span class="message" v-else>{{message.text}}</span>
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
    data(){
        return{
            listMessageToAdmin: [],
            listMessageToUser: [],
            listMessage: [],
            textMessage: '',
            timerLoadMessageFrom: '',
            timerLoadMessageTo: ''
        }
    },
    created(){
        this.loadMassageToAdmin(),
        this.timerLoadMessageFrom = setInterval(this.loadMassageToAdmin, 10000)
        this.loadMassageToUser()
        this.timerLoadMessageTo = setInterval(this.loadMassageToUser, 10000)
    },
    computed:{
        listMessages: function(){
            var arr = [];
            for(var i=0; i < this.listMessageToAdmin.length; i++){
                if(arr.indexOf(this.listMessageToAdmin[i]))
                        arr.push(this.listMessageToAdmin[i])
                for(var j=0; j < this.listMessageToUser.length; j++)
                {
                    if(this.listMessageToAdmin[i].id == this.listMessageToUser[j].to_message)
                        arr.push(this.listMessageToUser[j])
                }
            }
            return arr
        }
    },
    beforeDestroy(){
        clearInterval(this.timerLoadMessageFrom)
        clearInterval(this.timerLoadMessageTo)
    },
    methods:{
        async loadMassageToAdmin(){
            this.listMessageToAdmin = await this.$http.get(
                `${this.$store.getters.getServerUrl}/lk/chat/toAdmin/`
            ).then(resp => resp.data)
        },
        async loadMassageToUser(){
            this.listMessageToUser = await this.$http.get(
                `${this.$store.getters.getServerUrl}/lk/chat/toUser/`
            ).then(resp => resp.data)
        },
        async sendMessage(){
            let form = {
                text: this.textMessage,
                author: this.$store.getters.getUserId
            }
            if(form.text != '')
                await this.$http({
                    url: `${this.$store.getters.getServerUrl}/lk/chat/create/`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: form
                }).then(resp => {
                    this.loadMassageToAdmin()
                })
        }
        
    }
}
</script>
<style scoped>
    .container-messager{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
    }
    .view-message{
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
    .message-list{
        background: gray;
        width: 30%;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 10px;
        font-family: "Helvetica Neue", Helvetica, sans-serif;
        margin-left: 20px;
    }
    .message_right{
        align-self: flex-end!important;
        background: rgb(7, 112, 197);
        color: white;
        margin-right: 20px;
        margin-left: 0!important;
    }
    .message{
        width: 100%;
    }
    .submit{
        width: 100%;
        display: flex;
    }
    .submit input{
        width: 80%;
        padding: 8px;
        
    }
    .submit button{
        width: 20%;
    }
    @media screen and (max-width: 1200px){
        .view-message{
            padding-top: 20px;
        }
    }
    @media screen and (max-width: 800px){
        .container-messager{
            width: 100%;
        }
        .view-message{
            width: 90%;
            margin-left: auto;
            margin-right: auto;
        }
        .message-list{
            width: 45%;
        }
        .submit{
            width: 90%;
            margin-left: auto;
            margin-right: auto;
        }
    }
    @media screen and (max-width: 400px){
        .view-message{
            width: 96%;
            margin-left: auto;
            margin-right: auto;
        }
        .message-list{
            width: 80%;
            align-self: flex-end;
        }
        .message_right{
            align-self: flex-start!important;
        }
    }
</style>