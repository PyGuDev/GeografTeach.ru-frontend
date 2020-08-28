function menu(){
    var menu_collapse = document.getElementById('collapse');
    var logo = document.getElementsByClassName('logo');
    if(menu_collapse.classList.value == 'collapse'){
        menu_collapse.classList.value += ' down';

    }
    else{
        menu_collapse.classList.value = 'collapse';

    }
    
}

