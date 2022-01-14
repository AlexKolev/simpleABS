'use strict';
/////////Работа с выбором МЕНЮ//////////////////////
//изменим отображение выбора МЕНЮ
function changeActiveClass_menu(event) {
    let menu_link_old = document.querySelector('.left__ul__item__obj.active');
    menu_link_old.classList.remove('active');
    event.currentTarget.classList.add('active');

    //делаем видимым поле для слов если играем в слова
    let word_field = document.querySelector('.maked_word');
    if (event.currentTarget.id == 'menu_2') {
        word_field.classList.remove('disp_none');
    } else if (event.currentTarget.id == 'menu_1') {
        word_field.classList.add('disp_none');
    }

}
//обработка нажатия выбора МЕНЮ
function clickHandler_menu_obj(event) {
    changeActiveClass_menu(event);
}
//навесим событие на нажатие МЕНЮ
let menu_objts = document.querySelectorAll('.left__ul__item__obj');
menu_objts.forEach(function (menu_obj) {
    menu_obj.addEventListener('click', clickHandler_menu_obj)
});
/////////КОНЕЦ Работа с выбором МЕНЮ//////////////////////