<template>
    <div class="block-link-pages">
        <ul class="links">
            <li v-for="p in total" :key="p">
                <button :class="{active: currentPage == p}" @click="changePage(p)">{{p}}</button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['total'],
    data(){
        return{
            currentPage: 1,
        }
    },
    methods:{
        changePage(pageNumber){
            this.currentPage = pageNumber
            this.$emit('page-changed', pageNumber)
            this.$emit('page-select', pageNumber)
        },
    }
}
</script>
<style scoped>
    .block-link-pages{
        width: 100%;
        display: flex;
        justify-content: center;
        padding: 10px;
    }
    .links{
        display: flex;
        justify-content: center;
    }
    .links li{
        list-style-type: none;
        margin: 4px;
    }
    .links li button{
        background-color: white;
        border: none;
        outline: none;
        box-shadow: 1px 2px 2px 0px #c4c4c4;
        font-size: 16px;
    }
    .links li button:hover{
        background-color: rgb(228, 228, 228);
        color: white;
    }
    .active{
        background-color: rgb(199, 199, 199)!important;
        color: white!important;
    }
</style>
