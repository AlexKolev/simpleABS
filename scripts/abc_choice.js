'use strict';
/////////Работа с выбором алфавита//////////////////////

//изменим отображение выбора алфавита
function changeActiveClass_nav(event) {
    let nav_link_old = document.querySelector('.nav-link.active');
    nav_link_old.classList.remove('active');
    event.currentTarget.classList.add('active');
}

//обработка нажатия выбора алфавита
function clickHandler_nav_link(event) {
    make_ABC(event.currentTarget.innerText); //in app.js
    changeActiveClass_nav(event);
}

//навесим событие на нажатие алфавита
let nav_links = document.querySelectorAll('.nav-link');
nav_links.forEach(function (nav_link) {
    nav_link.addEventListener('click', clickHandler_nav_link)
});
/////////КОНЕЦ Работа с выбором алфавита//////////////////////