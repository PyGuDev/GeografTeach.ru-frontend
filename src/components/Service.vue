<template>
  <div class="block-service">
    <form action>
      <div class="search">
        <input type="text" placeholder="Поиск" v-model="search"/>
        <a @click="submitTextSearch"><img src="../assets/icons/search.png" alt="search"></a>
      </div>
      <div class="select">
        <label for="select">Категории:</label>
        <select v-model="selected">
          <option disabled value>Выберите один из вариантов</option>
		  <option></option>
          <option v-for="category in listCategory" :key="category.pk">{{category.name}}</option>
        </select>
      </div>
    </form>
  </div>
</template>

<style scoped>
.block-service{
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	width: 35%;
	background-color: white;
	padding: 20px;
	display: flex;
	justify-content: center;
	border-radius: 10px;
}
.block-service form{
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-self: center;
}
.search{
	margin: 5px;
	display: flex;
}
.search input[type=text]{
	width: 80%;
	height: 26px;
	padding: 10px;
	box-shadow:0 0 15px 4px rgba(0,0,0,0.103);
	border-radius: 10px;
	border: 0;
	margin-right: 10px;
}
.search input[type=text]:hover{
	box-shadow:0 0 15px 10px rgba(0, 0, 0, 0.164);
}
.search a{
	padding: 10px;
	background-color: rgb(103, 216, 118);
	border-radius: 10px;
	border: 0;
	width: 28px;
	height: 26px;
}
.search a img{
	width: 100%;
}
.search a:hover{
	background-color: rgb(77, 163, 89);
	transition: background .3s linear, color .3s linear;
}

.search input[type=text]:focus {
	outline:none !important;
	box-shadow:0 0 15px 10px rgba(0, 0, 0, 0.164);
}
.search a:focus{outline:none !important}

.select{
	width:100%;
	margin: 5px;
}
.select select{
	width: 80%;
	margin-top: 10px;
	margin-left: 10px;
	padding: 10px;
	border-radius: 10px;
	border: 0;
	box-shadow:0 0 15px 4px rgba(0, 0, 0, 0.103);
}

@media screen and (max-width:700px){
	.block-service{
		width: 90%;
	}
}
</style>

<script>
export default {
  name: "Service",
  data(){
	  return{
		  listCategory: [],
		  selected: '',
		  search: '',
	  }
  },
  created(){
	  this.loadListCategory()
  },
  watch:{
	  selected: function(){
		  this.updateArticle(this.selected)
	  }
  },
  methods:{
	  updateArticle(select){
		  this.$emit('updateParent', {
			  selected: select,
		  })
	  },
	  submitTextSearch(){
		  this.$emit('updateParent', {
			  search: this.search,
			  selected: this.selected
		  })
	  },
	  async loadListCategory(){
            this.listCategory = await fetch(
            `${this.$store.getters.getServerUrl}/blog/category/`
			).then(response => response.json())
		},
	  }
}
</script>