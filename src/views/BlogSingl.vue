<template>
<div class="container">
        <div class="block-content">
            <div class="row-blog">
                <div class="col">
                    <div class="description">
                        <img :src="article.img" alt="" srcset="">
                        <div class="youtube" v-if="article.url_youtube">
                            <iframe width="560" height="315" frameborder="0" :src="getUrllYuotubeVideo(article.url_youtube)" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                        <h3>{{article.title}}</h3>
                        <span>Категория: {{article.category}}</span>
                        <p>{{article.text}}</p>
                    </div>
                    <div class="visibility">
                        <span style="padding-right: 15px">Дата публикации: {{article.pub_date}}.</span>
                        <img src="../assets/icons/eye.png" alt="" srcset="">
                        <span>{{article.visit}}</span>
                        <img v-if="article.like_user" src="../assets/icons/like.png" alt="" srcset="" style="padding-left: 10px" @click="addLike(article.id, article.like_user)">
                        <img v-else src="../assets/icons/like_.png" alt="" srcset="" style="padding-left: 10px" @click="addLike(article.id, article.like_user)">
                        <span>{{article.count_like}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogSingl',
    props: ['id'],
    data() {
        return{
            article: [],
        }
    },
    created(){
        this.loadArticle()
    },
    
    methods: {
        async loadArticle(){
            this.article = await fetch(
            `${this.$store.getters.getServerUrl}/blog/article/${this.id}/`
            ).then(response => response.json()).catch(e =>{
                console.log(e);
            })
            
        },
       async addLike(id_article, is_like){
            let data = {
                article: id_article,
                like: is_like ? false : true,           
            }
            await this.$http({
                url: `${this.$store.getters.getServerUrl}/blog/addLike`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
               data: JSON.stringify(data)
            }), 
            this.loadArticle()
        },
        getUrllYuotubeVideo(url){
            var tmp = url.split('/')[3].split('=')[1]
            return `https://www.youtube.com/embed/${tmp}`
        }
    }
}
</script>

<style scoped>
    .container{
        width: 100%;
        display: block;
    }
    .block-content{
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        align-items: center;
        width: 70%;
        padding: 10px;
    }
    .row-blog{
        display: flex;
        justify-content: center;
        background-color: white;
        border-radius: 10px;
        margin-bottom: 20px;
    }
    .col{
        width: 80%;
    }
    .description{
        margin-left: 20px;
        padding-right: 10px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .description img{
        width: 50%;
        margin-top: 20px;
    }
    .youtube{
        width: 80%;
        align-self: center;
        margin-left: auto;
        margin-right: auto;
    }
    .youtube iframe{
        width: 90%;
        margin: 10px;
    }
    .description button{
        background-color: rgb(0 0 0 / 35%);
        border-radius: 10px;
        border: 0;
        padding: 7px;
        color: white;
        font-size: 14px;
    }
    .description button:hover{
        background-color: rgb(0 0 0 / 45%);
    }
    .description button:focus{
        outline: none;
    }
    .block-service{
        margin-left: auto;
        margin-right: auto;
    }
    .visibility{
        margin-top: 20px;
        margin-bottom: 10px;
        display: flex;
        justify-content: flex-end;
        margin-right: 50px;
        align-items: center;
    }
    .visibility img{
        width: 30px;
        align-self: center;
        margin-right: 10px;
    }
    .visibility span{
        align-self: center;
    }
    @media screen and (max-width: 700px){
        .block-content{
            width: 100%;
            padding: 0;
        }
    }
    @media screen and (max-width: 560px){
        .row-blog{
            flex-direction: column;
        }
        .col{
            width: 100%;
        }
        .image{
            width: 100%!important;
        }
        .description p{
            text-align: start;
        }
    }
</style>