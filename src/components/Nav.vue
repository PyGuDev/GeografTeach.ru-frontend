<template>
<div class="container" id="nav">
        <div class="header">
            <div class="humbager">
                <div class="btn-collapse">
                    <button v-on:click="show = !show" v-bind:class="{'open': !show, 'close': show}"></button>
                </div>
            </div>
            {{this.click}}
            <nav id='collapse' class="collapse" v-bind:class="{'collapse':!show, 'down': show}" style="opacity:100%!important">
                <ul>
                    <li class="nav-link"><a href="" v-bind:class="{'active':  path == 'Home'}" @click="goTo('Home')">Главная</a></li>
                    <li class="nav-link"><a href="" v-bind:class="{'active':  path == 'About'}" @click="goTo('About')">Обо мне</a></li>
                    <li class="nav-link"><a href="" v-bind:class="{'active':  path == 'Blog'}" @click="goTo('Blog')">Новости</a></li>
                    <li class="nav-link"><a href="" v-bind:class="{'active':  path == 'File'}" @click="goTo('File')">Файлы</a></li>
                </ul>
                <div class="login"  v-if="!isLoggedIn">
                    <a href="" @click="goTo('SingIn')"><img src="../assets/icons/user.png" alt=""></a>
                </div>
                <div class="user" v-else>
                    <a href="" @click="goTo('Lk')">{{username}}</a>
                    <a href="" @click="logout">Выйти</a>
                </div>
            </nav>
            
        </div>
</div>    
</template> 

<script>
export default {
    name: 'Nav',
    props: ['click'],
    data: function(){
        return{
            show: false,
            up: 'collapse',
            down: 'down',
            path: '',
            username: '',
        }
    },
    created(){
        this.activeLink()
        this.getUserName()
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
    },

    methods: {
        goTo(namePath){
            if(this.$router.app._route.name != namePath){
                this.$router.push({name: namePath})
                this.path = namePath
                this.show = false
            }
        },
        activeLink(){
            this.path = this.$router.app._route.name
        },
        logout: function () {
            this.$store.dispatch('logout')
            .then(() => {
            this.$router.push({name: 'SingIn'})
            })
        },
        getUserName(){
            this.username = this.$store.getters.getUser
        }

    }
    
}
</script>

<style>
    .open{
        background: url('../assets/icons/menu.svg');
        border: none;
        width: 48px;
        height: 48px;
        margin-right: 20px;
    }
  
    .open:focus{
        border: none;
        outline: none;
    }
    .close:focus{
        border: none;
        outline: none;
    }
    .close{
        background: url('../assets/icons/close.svg');
        border: none;
        width: 48px;
        height: 48px;
        margin-right: 20px;
        transform: rotate(180deg);
        transition: transform 0.4s ease;
    }
    .user{
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-right: 20px;
    }
    .user a{
        color: white;
        text-decoration: none;
        font-size: 14px;
        padding-bottom: 4px;
    }
    .user a:hover{
        color: rgb(223, 223, 223);
    }
    @media screen and (max-width: 570px){
        .user{
            margin-right: 0;
            margin-bottom: 20px;
        }
    }
</style>