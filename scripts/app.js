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

//навесим событие на нажатие алфавита
let nav_links = document.querySelectorAll('.nav-link');
nav_links.forEach(function (nav_link) {
    nav_link.addEventListener('click', clickHandler_nav_link)
});

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
    let conteiner = document.querySelector('.conteiner');
    conteiner.innerHTML = '';
    if (abc == 'ENG') {
        // ABC_ENG in ABC_ENG.js
        for (let index = 0; index < ABC_ENG.length; index++) {
            const element = ABC_ENG[index];
            let aHtmlText = `<div class="letter ${ABC_ENG[index].color}">
                                <h4>${ABC_ENG[index].letter.toUpperCase() + ABC_ENG[index].letter}</h4>
                            </div>   
                            `;
            conteiner.insertAdjacentHTML('beforeend', aHtmlText)
        };
    } else if (abc == 'RUS') {
        // ABC_RUS in ABC_RUS.js
        for (let index = 0; index < ABC_RUS.length; index++) {
            const element = ABC_RUS[index];
            let aHtmlText = `<div class="letter ${ABC_RUS[index].color}">
                                    <h4>${ABC_RUS[index].letter.toUpperCase() + ABC_RUS[index].letter}</h4>
                                </div>   
                                `;
            conteiner.insertAdjacentHTML('beforeend', aHtmlText)
        };
    };
    add_letter_click();
};

//изменим отображение выбора алфавита
function changeActiveClass_nav(event) {
    let nav_link_old = document.querySelector('.active');
    nav_link_old.classList.remove('active');
    event.currentTarget.classList.add('active');
}

//обработка нажатия выбора алфавита
function clickHandler_nav_link(event) {
    make_ABC(event.currentTarget.innerText);
    changeActiveClass_nav(event);
}

//событие на нажатие буквы
function clickHandler_letter(event) {
    let nav_link_cur = document.querySelector('.active');
    speakText(event.currentTarget.innerText.charAt(0), nav_link_cur.innerText);
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
