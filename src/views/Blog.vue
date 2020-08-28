<template>
    <div class="container">
        <Service @updateParent="onUpdateSalary"/>
        <div class="block-content">
            <div class="row-blog" v-for="article in listArticle" :key="article.id">
                <div class="col image" v-if="article.img"><img :src="article.img" alt="" srcset=""></div>
                <div class="col">
                    <div class="description">
                        <h3>{{article.title}}</h3>
                        <span>Категория: {{article.category}}</span>
                        <p>{{article.text.substring(0, 250)}}</p>
                        <button @click="goTo(article.id)">Читать далее...</button>
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
            page: 1
        }
    },
    components: {Service, Pagination},
    created(){
        this.loadListArticle(this.page)
    },
    methods:{
        onUpdateSalary(someData){
            if(someData != undefined){
                this.selected = someData.selected
                this.loadSearchedListArticle()
                if(someData.search != undefined){
                    this.search_text = someData.search
                    this.loadSearchedListArticle()
            }}
               
        },
        search(text){
            return  this.listArticle.filter(function(value){
                return value.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
            })
        },
        selectFilter(select){
            return  this.listArticle.filter(function(value){
                return value.category.indexOf(select) > -1;
            })
        },
        async loadSearchedListArticle(){
            this.listArticle = await this.$http(
            `${this.$store.getters.getServerUrl}/blog/filter/`
            ).then(response => response.data);
            this.listArticle = this.listArticle
            this.listArticle = this.search(this.search_text)
            if(this.selected)
                this.listArticle = this.selectFilter(this.selected)
        },
        async loadListArticle(pageNumber){
            this.listArticle = await this.$http(
            `${this.$store.getters.getServerUrl}/blog/?page=${pageNumber}`
            ).then(response => response.data);
            this.countPages = this.listArticle.count
            this.nextPage = this.listArticle.links.next
            this.nextPage = this.nextPage != null ? this.nextPage.split('?')[1]: ''
            this.previosPage = this.listArticle.links.previous
            this.previosPage = this.previosPage != null ? this.previosPage.split('?')[1] : ''
            this.listArticle = this.listArticle.results
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
            this.loadListArticle(this.page)
        },
        goTo(id){
            this.$router.push({name: 'BlogSingl', params: {id: id}})
            this.path = 'BlogSingl'
        },
        selectPage(pageNumber){
            this.page = pageNumber
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
