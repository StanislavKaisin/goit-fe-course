"use strict";
import fetchedURLCard from './services/api';
import * as storage from './services/storage';
import URLCardTemplate from './templates/URLCardTemplate.hbs';
import './styles.css';
/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    1. - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    2. - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    3. - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    4. - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для создания списка карточек. 
    5. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
    6.  * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
    7.   * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
  8.  - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
  9.  - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
  10.  - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
11. - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
12. - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/

let URLCardsList = [];
const APIKEY = '5c6070bbacc99ae473f5630fed11166e035117fd0a863';

document.addEventListener("DOMContentLoaded", fromLocalGet);
let result = document.querySelector('.js-result>ul');
result.addEventListener('click', handleDelCard);
let inputForm = document.querySelector('.js-form--id');
inputForm.addEventListener('submit', handleInputURL);

//================logic
function checkURLList(newURL) {
  let URLindex = URLCardsList.find(URLCard => URLCard.url === newURL);
  return URLindex;
}

function checInputURL(inputURL) {
  let pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  let result = pattern.test(inputURL);
  return result;
}

function getInputUrl(event) {
  let input = event.target[0];
  let inputURL = input.value;
  let check = checInputURL(inputURL);
  if (check) return inputURL
  else {
    clearInput(event);
    alert('Entered wrong URL!');
    return;
  };
}

function deleteThisCard(deletedCard) {
  URLCardsList = URLCardsList.filter(URLCard => deletedCard !== URLCard.url);
}

//================interface
function fromLocalGet() {
  let URLCardsFromStorage = storage.fromLocalGet();
  if (URLCardsFromStorage !== null) {
    URLCardsList = URLCardsFromStorage;
    updateCardsList(URLCardsList);
  }
}

function handleInputURL(event) {
  event.preventDefault();
  let newURL = getInputUrl(event);
  if (newURL === 'Entered wrong URL!') {
    clearInput(event);
    return;
  } else {
    newURL = newURL;
    clearInput(event);
    let isURL = checkURLList(newURL);
    if (isURL === undefined) {
      return getPreviewInfo(newURL);
    } else {
      alert("Введенный адрес уже есть в коллекции!");
      return;
    }
  }
}

function clearInput(event) {
  return event.target[0].value = '';
}

function updateCardsList(URLCardsList) {
  let markup = '';
  markup = URLCardsList.reduce((markup, item) => markup + URLCardTemplate(item), '');
  result = document.querySelector('.js-result>ul');
  result.innerHTML = markup;
}

function handleDelCard(event) {
  if (event.target.nodeName === 'BUTTON') {
    event.preventDefault();
    let deletedCard = event.target.attributes.cardname.value;
    deleteThisCard(deletedCard);
    storage.toLocalSet(URLCardsList);
    updateCardsList(URLCardsList);
  }
}
//================API

function getPreviewInfo(URL) {
  fetch(`https://api.linkpreview.net/?key=${APIKEY}&q=${URL}`)
    .then(response => response.json())
    .then(data => {
      if (data.hasOwnProperty('error')) {
        console.log(`error from server ${data.error}: ${data.description}`);
        return;
      }
      let URLCard = {};
      URLCard.description = data.description;
      URLCard.image = data.image;
      URLCard.title = data.title;
      URLCard.url = URL;
      URLCardsList.unshift(URLCard);
      storage.toLocalSet(URLCardsList);
      updateCardsList(URLCardsList);
    })
    .catch(error => console.log(error));
}
