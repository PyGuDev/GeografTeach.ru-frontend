<template>
    <div class="block-content-task">
        <h2 class="title-back"><a href="" @click="goBack()">назад в личный кабинет</a></h2>
        <h2 class="title-task">Задание</h2>
        <div class="task-info">
            <h3>{{task.title}}</h3>
            <span>Для {{task.class_student}} классов</span>
            <p>{{task.description}}</p>
            <div class="image-list">
                <div class="item-img" v-for="img in img_task" :key="img.id">
                    <img :src="img.img" alt="Задания">
                </div>
                
            </div>
            <span>Дата сдачи: {{task.date.split('T')[0]}} {{task.date.split('T')[1].split('Z')[0]}}</span>
        </div>
        <h2 class="title-task">Ответ</h2>
        <div class="answer-form" v-if="answer.length == 0">
            <div class="answer_card">
            <form @submit.prevent="uploadForm">
				<textarea name="description" cols="60" rows="10" v-model="description"></textarea>
				<input type="file" name="file" ref="file" @change="onFileSelect">
				<span style="color: red">{{error}}</span>
				<input type="submit" value="Отправить">
            </form>
            </div>
        </div>
        <div class="answer-info" v-else>
            <p>Ваш ответ: {{answer[0].description}}</p>
            <span>Оценка: {{answer[0].estimation}}</span>
            <p>Комментарий: {{answer[0].commets_answer}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Task',
    props: ['id'],
    data(){
        return{
            task: [],
            img_task: '',
            answer: [],
            description: '',
            author: '',
            file: null,
            task_answer:'',
            error: '',
        }
    },
    created(){
        this.loadTask(),
        this.loadImage(),
        this.loadAnswer()
    },
    methods:{
        async loadTask(){
            this.task = await this.$http.get(
                `${this.$store.getters.getServerUrl}/lk/task/${this.id}/`
            ).then(resp => resp.data)
        },
        async loadImage(){
            this.img_task = await this.$http.get(
                `${this.$store.getters.getServerUrl}/lk/task/image/${this.id}/`
            ).then(resp => resp.data)
            
        },
        onFileSelect(event){
            this.file = event.target.files[0]
        }
        ,
        getUserId(){
            return this.$store.getters.getUserId
        },
        validate_data(){
            if(this.description != '' && this.file)
                return true
            else
                return false
        },
        async uploadForm(){
            let form = {
                author: this.getUserId(),
                description: this.description,
                file_answer: this.file,
                task: this.task.id
            }
            const fd = new FormData()
            fd.append('file_answer', this.file, this.file.name)
            fd.append('author', this.getUserId())
            fd.append('description', this.description)
            fd.append('task', this.task.id)
            if(this.validate_data()){
                this.error = ''
                await this.$http({
                    url: `${this.$store.getters.getServerUrl}/lk/task/answer/add/`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: fd
                }
                ).then(resp => console.log(resp))
            }
            else
                this.error = "Заполните все поля"
        },
        async loadAnswer(){
            this.answer = await this.$http.get(
                `${this.$store.getters.getServerUrl}/lk/task/answer/${this.id}`
            ).then(resp => resp.data)
            console.log(this.answer);
        },
        goBack(){
            this.$router.push({name: 'Lk'})
            this.path = 'Lk'
        }
    }
}
</script>

<style scoped>
    .block-content-task{
        margin-top: 20px;
        margin-left: auto;
        margin-right: auto;
        align-items: center;
        width: 90%;
        background-color: white;
        font-family: Arial, Helvetica, sans-serif;
        margin-bottom: 50px;
    }
    .task-info{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
    }
    .title-back{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background: rgb(219, 219, 219);
        padding: 10px 0 10px 0;
        margin: 0;
        width: 100%;
        text-align: center;
    }
    .title-back a{
        color: black;
    }
    .answer-info{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 20px;
    }
    .image-list{
        width: 60%;
        display: flex;
        margin-top: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }
    .item-img{
        width: 100%;
        margin: 10px;
    }
    .item-img img{
        width: 100%;
    }
    .answer_card {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        margin-bottom: auto;
        background: #cecece;
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
    form input[type='submit']{
        background-color: rgb(71, 163, 43);
        color: white;
    }
    form input[type='submit']:hover{
        background-color: rgb(56, 128, 34);
        color: white;
    }
    form textarea{
        width: 100%;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
    }
</style>