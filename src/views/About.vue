<template>
    <div class="container">
        <div class="content">
            <div class="top">
                <div class="avatar">
                    <img class="img-main" src="https://sun9-48.userapi.com/c857120/v857120947/1446e9/bkCMO84QotM.jpg">
                </div>
                <div class="text-about">
                    <h1>Здравствуйте, меня зовут Губаева Марина Салкаевна</h1>
                    <p>Я учитель географии и биологии, а также являюсь заместителем директора по воспитательной работе. Мне очень нравится работать
                        с детьми, я обожаю свою работу, стараюсь выкладываться на 100%. Участвую в разных конкурсах и вебинарах для своего развития.
                            Также в свободное время занимаюсь спортом, не надо забывать о своем здоровье.
                            Я люблю помогать людям и поэтому был создан данный сайт, для передачи накопленного мною опыта.
                        Надеюсь, я смогу вам помочь!</p>
                    <h3>Мои достижения</h3>
                    <div class="row">
                        <div class="col">
                            <img class="img" src="../assets/icons/lar.jpeg">
                            <h5>Диплом</h5>
                            <p>Лауреат открытого Всеросийского конкурса "Лучшая методическая разработка"</p>
                        </div>
                        <div class="col">
                            <img class="img" src="../assets/icons/poch.jpeg">
                            <h5>Почетная грамота</h5>
                            <p>За многолетний добросовестный, плодотворный труд; Большой вклад в дело обучения и воспитания подрастающего поколения.</p>
                        </div>
                        <div class="col">
                            <img class="img" src="../assets/icons/blag.jpeg">
                            <h5>Благодарность</h5>
                            <p>За подготовку 2-х призеров муниципального этапа Всеросийской олимпиады школьников.</p>
                        </div>
                        <div class="col">
                            <img class="img" src="../assets/icons/dipl.jpeg">
                            <h5>Диплом</h5>
                            <p>Занявшей 2 место в лыжных гонках среди женщин в возрасте после 40 лет в физкультурно-оздоровителльной спартакиаде "Здоровье"</p>
                        </div>
                              <div class="col">
                                <img class="img" src="../assets/icons/serf.jpeg">
                                <h5>Сертификат</h5>
                                <p>Принимала участие по Всероссийской научно-практической конференции "Практическая психология оброзования: опыт, проблемы, перспективы"</p>
                            </div>
                              <div class="col">
                                <img class="img" src="../assets/icons/serf2.jpeg">
                                <h5>Сертификат</h5>
                                <p>Участие в вебинаре "Структурно-содержательные особенности линий УМК по географии издательства "Просвещение" для реализации требований ФГОС ООО"</p>
                            </div>
                              <div class="col">
                                <img class="img" src="../assets/icons/svid.jpeg">
                                <h5>Свидетельство</h5>
                                <p>Приняла участие в вебинаре на тему "Речь педагога: культура, технологии, стратегия"</p>
                            </div>
                              <div class="col">
                                <img class="img" src="../assets/icons/serf3.jpeg">
                                <h5>Сертификат</h5>
                                <p>Принимала участие в вебинаре "Концептуальные подходы к изучению экономической и социальной географии в 10-11-х классах. Возможности УМК "Сфера""</p>
                            </div>
                        </div>
                </div>
            </div>    
        </div>
    </div>
</template>
<style scoped>
.top{
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
    margin-top: 50px;
    color: rgb(63, 63, 63);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.avatar{
    width: 40%;
    margin-right: 20px;
}
.avatar img{
    width: 100%;
}
.text-about{
    width: 40%;
    align-items: center;
    align-self: center;
}
.text-about h3{
    text-align: center;
    margin-top: 50px;
}
.row{
    display: flex; 
    flex-wrap: wrap;
    justify-content: center;
    font-family: 'Raleway', sans-serif;
    margin-top: 30px;
}
.col{
    width: 25%;
    justify-content: start;
    margin: 10px;
    align-items: center;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-self: center;
}
.col img{
    width: 80%;
}
@media screen and (max-width: 1240px){
    .top{
        flex-direction: column;
    }
    .avatar{
        width: 100%;
    }
    .text-about{
        width: 100%;
    }
}

@media screen and (max-width: 570px){
    .top{
        flex-direction: column;
        width: 100%;
        margin-top: 0;
    }
    .avatar{
        width: 100%;
    }
    .text-about{
        width: 90%;
    }
    .col{
        width: 70%;
    }
}
</style>

<script>
export default {
    name: 'About',
}
</script>