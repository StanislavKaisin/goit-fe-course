"use strict";
/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  1. При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  2. Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  3. Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  4. Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  5. Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/

const startBtn = document.querySelector(".js-start");
const lapBtn = document.querySelector(".js-take-lap");
const resetBtn = document.querySelector(".js-reset");

startBtn.addEventListener('click', startPauseBtnHandler);
lapBtn.addEventListener('click', lapTimer);
resetBtn.addEventListener('click', resetTimer);

let startTime;
let deltaTime;
let timerId = null;
let timerIsActive = false;
let pausedTimeFace = null;
let laps = [];

function startPauseBtnHandler(event) {
  let target = event.target;
  enableResetBtn(event);
  if (target.textContent === 'Start') {
    target.textContent = 'Pause';
    startTimer(event);
    timerIsActive = true;
    return;
  }
  if (target.textContent === 'Pause') {
    target.textContent = 'Continue';
    pauseTimer(event);
    timerIsActive = false;
    return;
  }
  if (target.textContent === 'Continue') {
    target.textContent = 'Pause';
    continueTimer(event);
    timerIsActive = true;
    return;
  }
}

function startTimer(event) {
  startTime = Date.now();
  timerId = setInterval(() => {
    const currentTime = Date.now();
    deltaTime = pausedTimeFace + currentTime - startTime;
    updateClockface(deltaTime, event);
  }, 100);
  timerIsActive = true;
}

function updateClockface(time, event) {
  let clockFace = event.target.parentNode.firstElementChild;
  clockFace.textContent = getFormattedTime(time);
}

function getFormattedTime(time) {
  let result;
  let date = new Date(time);
  let minutes = date.getMinutes();
  minutes = formatDate(minutes);
  let seconds = date.getSeconds(time);
  seconds = formatDate(seconds);
  let milliseconds = date.getMilliseconds(time);
  milliseconds = milliseconds / 100;
  milliseconds = parseInt(milliseconds);
  result = `${minutes}:${seconds}.${milliseconds}`;
  return result;
}

function formatDate(datePart) {
  let result;
  datePart < 10 ? (datePart = "0" + datePart) : datePart;
  result = datePart;
  return result;
};

function pauseTimer(event) {
  timerIsActive = false;
  clearInterval(timerId);
  pausedTimeFace = deltaTime;
  let clockFace = event.target.parentNode.firstElementChild;
  clockFace.textContent = getFormattedTime(pausedTimeFace);
}

function continueTimer(event) {
  startTimer(event);
  timerIsActive = true;
}


function resetTimer(event) {
  clearInterval(timerId);
  let clockFace = event.target.parentNode.firstElementChild;
  clockFace.textContent = '00:00.0';
  const currentLapList = event.target.parentNode.nextElementSibling;
  const currentLaps = Array.of(...currentLapList.children);
  currentLaps.forEach(item => {
    item.remove();
  })

  startTime = null;
  deltaTime = null;
  timerIsActive = false;
  pausedTimeFace = null;
  laps = [];

  let currentResetBtn = event.target.parentNode.lastElementChild;
  currentResetBtn.classList.add('btn--disabled');
  currentResetBtn.setAttribute('disabled', 'disabled');

  let currentStartBtn = event.target.previousElementSibling.previousElementSibling;
  currentStartBtn.textContent = 'Start';
}

function lapTimer(event) {
  const currentLapList = event.target.parentNode.nextElementSibling;
  let markup = '';
  if (timerId !== null) {
    if (!laps.includes(deltaTime) && deltaTime !== null) {
      laps.push(deltaTime);
      markup = (`<li><p class="time js-time">${getFormattedTime(deltaTime)}</p></li>`);
      currentLapList.insertAdjacentHTML('beforeend', markup);
    };
  };
}

function enableResetBtn(event) {
  let currentResetBtn = event.target.parentNode.lastElementChild;
  currentResetBtn.classList.remove('btn--disabled');
  currentResetBtn.removeAttribute('disabled');
}
