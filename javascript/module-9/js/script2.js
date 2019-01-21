"use strict";

/*ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ*/
/*
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/

class Stopwatch {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.createMarkup = function (parentNode) {
      let markup = `<div class="stopwatch"><h2 class="time">This is Stopwatch in ${parentNode.classList}</h2><p class="time js-time">00:00.0</p><button class="btn js-start">Start</button><button class="btn js-take-lap">Lap</button><button disabled class="btn btn--disabled js-reset">Reset</button></div><ul class="laps js-laps"></ul>`;
      this.parentNode.insertAdjacentHTML('beforeend', markup);
    };
    this.newTimer = this.createMarkup(this.parentNode);

    this.startBtn = this.parentNode.firstElementChild.children[2];
    this.lapBtn = this.parentNode.firstElementChild.children[3];
    this.resetBtn = this.parentNode.firstElementChild.children[4];

    this.startTime = null;
    this.timerId = null;
    this.pausedTime = null;
    this.deltaTime = null;
    this.timerIsActive = false;
    this.laps = [];

    this.enableResetBtn = function (event) {
      let currentResetBtn = event.target.parentNode.lastElementChild;
      currentResetBtn.classList.remove('btn--disabled');
      currentResetBtn.removeAttribute('disabled');
    };

    this.formatDate = function (datePart) {
      let result;
      datePart < 10 ? (datePart = "0" + datePart) : datePart;
      result = datePart;
      return result;
    };

    this.getFormattedTime = function (time) {
      let result;
      let date = new Date(time);
      let minutes = date.getMinutes();
      minutes = this.formatDate(minutes);
      let seconds = date.getSeconds(time);
      seconds = this.formatDate(seconds);
      let milliseconds = date.getMilliseconds(time);
      milliseconds = milliseconds / 100;
      milliseconds = parseInt(milliseconds);
      result = `${minutes}:${seconds}.${milliseconds}`;
      return result;
    };

    this.updateClockface = function (deltaTime, event) {
      let clockFace = event.target.parentNode.firstElementChild.nextSibling;
      clockFace.textContent = this.getFormattedTime(deltaTime);
    };

    this.startTimer = function (event) {
      this.startTime = Date.now();
      this.timerId = setInterval(() => {
        const currentTime = Date.now();
        this.deltaTime = this.pausedTime + currentTime - this.startTime;
        this.updateClockface(this.deltaTime, event);
      }, 100);
      this.timerIsActive = true;
    };

    this.pauseTimer = function (event) {
      this.timerIsActive = false;
      clearInterval(this.timerId);
      this.pausedTime = this.deltaTime;
      let clockFace = event.target.parentNode.firstElementChild.nextSibling;
      clockFace.textContent = this.getFormattedTime(this.pausedTime);
    };

    this.continueTimer = function (event) {
      this.startTimer(event);
      this.timerIsActive = true;
    };

    this.startPauseBtnHandler = function (event) {
      let target = event.target;
      this.enableResetBtn(event);
      if (target.textContent === 'Start') {
        target.textContent = 'Pause';
        this.startTimer(event);
        this.timerIsActive = true;
        return;
      };
      if (target.textContent === 'Pause') {
        target.textContent = 'Continue';
        this.pauseTimer(event);
        this.timerIsActive = false;
        return;
      };
      if (target.textContent === 'Continue') {
        target.textContent = 'Pause';
        this.continueTimer(event);
        this.timerIsActive = true;
        return;
      };
    };

    this.lapBtnHandler = function (event) {
      const currentLapList = event.target.parentNode.nextElementSibling;
      let markup = '';
      if (this.timerId !== null) {
        if (!this.laps.includes(this.deltaTime) && this.deltaTime !== null) {
          this.laps.push(this.deltaTime);
          markup = (`<li><p class="time js-time">${this.getFormattedTime(this.deltaTime)}</p></li>`);
          currentLapList.insertAdjacentHTML('beforeend', markup);
        };
      };
    };

    this.disableResetBtn = function (event) {
      let currentResetBtn = event.target.parentNode.lastElementChild;
      currentResetBtn.classList.add('btn--disabled');
      currentResetBtn.setAttribute('disabled', 'disabled');
    };

    this.resetBtnHandler = function (event) {
      clearInterval(this.timerId);
      let clockFace = event.target.parentNode.firstElementChild.nextSibling;
      clockFace.textContent = '00:00.0';
      const currentLapList = event.target.parentNode.nextElementSibling;
      const currentLaps = Array.of(...currentLapList.children);
      currentLaps.forEach(item => {
        item.remove();
      });

      this.startTime = null;
      this.deltaTime = null;
      this.timerIsActive = false;
      this.pausedTime = null;
      this.laps = [];

      this.disableResetBtn(event);
      let currentStartBtn = event.target.previousElementSibling.previousElementSibling;
      currentStartBtn.textContent = 'Start';
    };

    this.startBtn.addEventListener('click', this.startPauseBtnHandler.bind(this));
    this.lapBtn.addEventListener('click', this.lapBtnHandler.bind(this));
    this.resetBtn.addEventListener('click', this.resetBtnHandler.bind(this));
  };
};

const parentA = document.querySelector('.parentA');
const timerA = new Stopwatch(parentA);

const parentB = document.querySelector('.parentB');
const timerB = new Stopwatch(parentB);

const parentC = document.querySelector('.parentC');
const timerC = new Stopwatch(parentC);


