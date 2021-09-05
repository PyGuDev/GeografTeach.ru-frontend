<template>
    <div class="container">
        <Service @updateParent="onUpdateParent"/>
        <div class="block-content" v-if="count !== 0">
            <div class="row-blog" v-for="article in listArticle" :key="article.id">
                <div class="col image" v-if="article.img"><img :src="article.img" alt="" srcset=""></div>
                <div class="col youtube" v-if="article.url_youtube">
                    <iframe width="560" height="315" frameborder="0" :src="getUrllYuotubeVideo(article.url_youtube)" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="col">
                    <div class="description">
                        <h3>{{article.title}}</h3>
                        <span>Категория: {{article.category}}</span>
                        <p>{{article.text.substring(0, 250)}}</p>
                        <button @click="goToPage(article.id)">Читать далее...</button>
                    </div>
                    <div class="visibility">
                        <span style="padding-right: 15px">Дата публикации: {{article.pub_date}}.</span>
                        <img src="../assets/icons/eye.png" alt="" srcset="">
                        <span>{{article.visit}}</span>
                        <img v-if="article.like_user" src="../assets/icons/like.png" alt="" srcset="" style="padding-left: 10px" @click="addLike(article.id)">
                        <img v-else src="../assets/icons/like_.png" alt="" srcset="" style="padding-left: 10px" @click="addLike(article.id)">
                        <span>{{article.count_like}}</span>
                    </div>
                </div>
            </div>
        </div>
        <Pagination :total="countPages" @page-changed="loadListArticle" @page-select="selectPage"/>
    </div>
</template>

<script>
import Service from '../components/Service';
import Pagination from '../components/Pagination';
import axios from 'axios';
export default {
    name: 'Blog',
    data() {
        return{
            listArticle: [],
            nextPage: '',
            previosPage: '',
            selected: '',
            search_text: '',
            countPages: 0,
            page: 1,
            count: 0
        }
    },
    components: {Service, Pagination},
    created(){
        this.loadListArticle(this.page)
    },
    methods:{
        onUpdateParent(data){
            if(data !== undefined){
                this.selected = data.selected
                if(data.search !== undefined) {
                  this.search_text = data.search
                }
                this.getFilteredListArticle()
            }
               
        },
        async getFilteredListArticle(){
            let params = {};
            if(this.selected)
              params['category'] = this.selected
            if(this.search_text)
              params['q'] = this.search_text

            let response_data = await this.$http(
              `${this.$store.getters.getServerUrl}/blog/`,
                  {params: params}
            ).then(response => response.data);
            this.count = response_data.count
            this.listArticle = response_data.results;

        },
        async loadListArticle(pageNumber){
            let response_data = await this.$http(
            `${this.$store.getters.getServerUrl}/blog/?page=${pageNumber}`
            ).then(response => response.data);
            this.count = response_data.count
            this.countPages = response_data.count_page
            this.nextPage = response_data.next
            this.nextPage = this.nextPage != null ? this.nextPage.split('?')[1]: ''
            this.previosPage = response_data.previous
            this.previosPage = this.previosPage != null ? this.previosPage.split('?')[1] : ''
            this.listArticle = response_data.results
        },
        async addLike(id_article){
            let response_data = await this.$http({
                url: `${this.$store.getters.getServerUrl}/blog/article/${id_article}/add_like/`,
                method: "POST",
            }).then(response => response.data);
             this.listArticle.filter(function(value){
                if(value.id === response_data.article) {
                  value.like_user = response_data.like;
                  if(value.like_user)
                    value.count_like ++;
                  else
                    value.count_like --
                }
            })

        },
        goToPage(id){
            this.$router.push({name: 'BlogSingl', params: {id: id}})
            this.path = 'BlogSingl'
        },
        selectPage(pageNumber){
            this.page = pageNumber
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
        width: 98%;
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
    .image{
        width: 38%!important;
        display: flex!important;
    }
    .youtube{
        width: 38%!important;
        display: flex!important;
    }
    .youtube iframe{
        width: 90%;
        margin: 10px;
    }
    .image img{
        width: 90%;
        margin: 20px;
    }
    .col{
        width: 60%;
        display: flex;
        flex-direction: column;
        align-self: center;
        align-items: center;
    }
    .description{
        margin-left: 20px;
        padding-right: 10px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
        align-items: center;
    }
    .visibility img{
        width: 30px;
        align-self: center;
        margin-right: 5px;
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
        .youtube{
            width: 90%!important;
        }
        .description p{
            text-align: start;
        }
        .visibility{
            font-size: 14px;
        }
        .visibility img{
            width: 20px;
        }
    }
</style>
