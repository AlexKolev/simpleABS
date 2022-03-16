'use strict';

// const voiceInEl = document.getElementById('voice');
// updateVoices();
// window.speechSynthesis.onvoiceschanged = updateVoices;
// function updateVoices() {
//     // add an option for each available voice that isn't already added
//     window.speechSynthesis.getVoices().forEach(voice => {
//         const isAlreadyAdded = [...voiceInEl.options].some(option => option.value === voice.voiceURI);
//         if (!isAlreadyAdded) {
//             const option = new Option(voice.name, voice.voiceURI, voice.default, voice.default);
//             voiceInEl.add(option);
//         }
//     });
// }

//Первоначальное заполнение
make_ABC('RUS');

//Пытаемся получить доступные голоса (именно "пытаемся", поскольку в первый раз, по крайней мере, в Chrome возвращается пустой массив)
window.speechSynthesis.getVoices();

//навесим событие на нажатие буквы
function add_letter_click() {
    let letters = document.querySelectorAll('.letter');
    letters.forEach(function (letter_click) {
        letter_click.addEventListener('click', clickHandler_letter)
    });
}

//нарисуем алфавит
function make_ABC(abc) {
    let abc_cont = document.querySelector('.abc_cont');
    abc_cont.innerHTML = '';
    if (abc == 'ENG') {
        // ABC_ENG in ABC_ENG.js
        for (let index = 0; index < ABC_ENG.length; index++) {
            const el_keys = Object.keys(ABC_ENG[index]);
            const element = el_keys[0];
            let aHtmlText = `<div class="letter ${ABC_ENG[index][element]} movelink_letter letter_margin_abc">
                                <h4>${element.toUpperCase() + element}</h4>
                            </div>   
                            `;
            abc_cont.insertAdjacentHTML('beforeend', aHtmlText)
        };
    } else if (abc == 'RUS') {
        // ABC_RUS in ABC_RUS.js
        for (let index = 0; index < ABC_RUS.length; index++) {
            const el_keys = Object.keys(ABC_RUS[index]);
            const element = el_keys[0];
            let aHtmlText = `<div class="letter ${ABC_RUS[index][element]} movelink_letter letter_margin_abc">
                                    <h4>${element.toUpperCase() + element}</h4>
                                </div>   
                                `;
            abc_cont.insertAdjacentHTML('beforeend', aHtmlText)
        };
    };
    add_letter_click();
    add_word_del_click();
    add_right_word_listener();
};

//событие на нажатие буквы
function clickHandler_letter(event) {
    let nav_link_cur = document.querySelector('.nav-link.active'); //язык текста
    let menu_link_cur = document.querySelector('.left__ul__item__obj.active');
    if (menu_link_cur.id == 'menu_2') {
        add_To_Word(event.currentTarget.innerText.charAt(0), event.currentTarget.classList[1]);//добавляем букву
    }// else if (menu_link_cur.id == 'menu_1') {
    speakText(event.currentTarget.innerText.charAt(0), nav_link_cur.innerText);
    //}
}

//произносим текст
function speakText(to_say, lang) {
    let voice_lang = null;
    // остановим все, что уже синтезируется в речь
    window.speechSynthesis.cancel();
    if (lang == 'ENG') {
        //     lang = 'en-US';
        voice_lang = 'Google US English';
    } else if (lang == 'RUS') {
        voice_lang = 'Google русский';
        //     lang = 'ru-RU';
    }
    const utterance = new SpeechSynthesisUtterance(to_say);
    //utterance.lang = lang;
    utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.voiceURI === voice_lang);
    window.speechSynthesis.speak(utterance);
}

//добавление буквы в слово
function add_To_Word(letter, color) {
    let word = document.querySelector('.maked_word__word');/*${ABC_ENG[index].color}*/
    let aHtmlText = `<div class="letter ${color} movelink_letter">
                                <h4>${letter}</h4>
                            </div>   
                            `;
    word.insertAdjacentHTML('beforeend', aHtmlText);
}

//BEGIN работа с кнопками
//событие удаление слова
function clickHandler_word_del(event) {
    let word_del = this.parentNode;
    word_del.remove();
}
//обновим addEventListener на крестике
function add_word_del_click() {
    let wordsRemove = document.querySelectorAll('.right__conteiner__words__remove');
    wordsRemove.forEach(function (wordRemove) {
        wordRemove.addEventListener('click', clickHandler_word_del);
    });
}
//событие на нажатие Say
function btn_say_click(event) {
    let letters = this.parentNode.parentNode.querySelectorAll('.letter');
    let whole_word = '';
    letters.forEach(function (letter) {
        whole_word += letter.innerText;
    });
    speakText(whole_word.toLowerCase(), document.querySelector('.nav-link.active').innerText);
    let add_word = document.querySelector('.right__conteiner');
    //let aHtmlText = `<p class="add_word">${whole_word}</div>`;
    let aHtmlText = `<div class="right__conteiner__words">
                        <p class="right__conteiner__words__item movelink_letter">${whole_word}</p>
                        <p class="right__conteiner__words__remove movelink_letter">&#10006</p>
                    </div>`;
    add_word.insertAdjacentHTML('beforeend', aHtmlText)
    //обновим addEventListener на крестике
    add_word_del_click();
    add_right_word_listener();
}
//событие добавление слова из правого списка
function clickHandler_word_add(event) {
    let word = this.innerText;
    let ABC = null;
    if (document.querySelector('.nav-link.active').innerText == 'ENG') {
        ABC = ABC_ENG;
    } else if (document.querySelector('.nav-link.active').innerText == 'RUS') {
        ABC = ABC_RUS;
    }
    btn_clear_click.call(document.querySelector('.maked_word__buttons__clear'));  // 'Custom'
    word.split('').forEach((letter) => {
        console.log(letter);
        let abc_item = ABC.find(item => Object.keys(item)[0] == letter.toLowerCase());
        add_To_Word(letter, abc_item[letter.toLowerCase()]);//добавляем букву
    })
}
//обновим addEventListener на словах справа
function add_right_word_listener() {
    let words = document.querySelectorAll('.right__conteiner__words__item');
    words.forEach(function (word) {
        word.addEventListener('click', clickHandler_word_add);
    });
}

let btn_say = document.querySelector('.maked_word__buttons__say');
btn_say.addEventListener('click', btn_say_click);

//событие на нажатие Clear
function btn_clear_click(event) {
    let letters = this.parentNode.parentNode.querySelectorAll('.letter');
    letters.forEach(function (letter) {
        letter.remove();
    });
}
let btn_clear = document.querySelector('.maked_word__buttons__clear');
btn_clear.addEventListener('click', btn_clear_click);
//END работа с кнопками