<template>
    <div class="container">
        <div class="body">
            <div class="welcom">
                <h1>Сайт учителя географии</h1>
                <h3>Губаевой Марины Салкаевны</h3>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <h4 >ЕГЭ по географии</h4>
                    <p>Здесь вы найдете информацию по егэ: Объяснение решения заданий; Ким;</p>
                </div>
                <div class="col">
                    <img src="data:image/png;base64,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">
                    <h4 >Учебный материал</h4>
                    <p>Здесь вы найдете: Карты, Тесты, Книги, Учебные пособия</p>
                    </div>
                <div class="col">
                    <img src="data:image/png;base64,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">
                    <h4>Тесты</h4>
                    <p>Система тестирования знания материала 5-11-x классов</p>
                </div>
                <div class="col">
                    <img src="data:image/png;base64,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">
                    <h4 >Расписание</h4>
                    <p>Расписание занятий для учеников школы МОБУ СОШ с.Бедеева Поляна</p>
                </div>
                <div class="col">
                    <img src="data:image/png;base64,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">
                    <h4 >Общение</h4>
                    <p>Чат со мной, где я буду отвечать на ваши вопросы</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .body{
    width: 100%;
    background: url('https://ik.arhano.ru/wp-content/uploads/2019/04/World___Travel_and_Tourism_Compass_on_old_world_map_067503_.jpg');
}
.welcom{
    color: rgb(255, 255, 255);
    text-align: center;
    height: 500px;
    padding-top: auto;
    padding-bottom: auto;
}
.welcom h1{
    margin: 0;
    padding-top: 20px;
    padding-bottom: 10px;
    font-family: 'Lobster', cursive;
    font-size: 56px;
}
.welcom h3{
    font-family: 'Lobster', cursive;
    font-size: 44px;
}
.container{
    width: 100%;
}
.row{
    width: 100%;
    margin-top: 100px;
    display: flex; 
    flex-wrap: wrap;
    justify-content: center;
    font-family: 'Raleway', sans-serif;
    font-size: 18px;
}
.col{
    margin: 10px;
    width: 200px;
    align-items: center;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-self: center;
}
.col img{
    width: 70%;
}
@media screen and (max-width: 700px){
    .welcom h1{
        font-size: 36px;
    }
    .welcom h3{
        font-size: 30px;
    }
    .col{
        width: 250px;
    }
}
</style>

