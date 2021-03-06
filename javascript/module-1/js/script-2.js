/*
  ⚠️ ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте скрипт турагенства, продающего поездки в 3-х группах: sharm, hurgada и taba.
  Кол-во мест в группах ограничено (создайте переменные для хранения мест в группах): 
    * sharm - 15
    * hurgada - 25
    * taba - 6.
  Когда пользователь посещает страницу, ему необходимо предложить ввести число необходимых мест,
  результат сохранить в переменную.
  Необходимо проверить являются ли введенные данные целым положительным числом. 
  
    - В случае неверного ввода от пользователя, скрипт показывает alert с текстом 
      "Ошибка ввода" и больше ничего не делает.
    - Если пользователь нажал Cancel, скрипт показывает alert с текстом "Нам очень жаль, приходите еще!".
    - В случае верного ввода, последовательно проверить кол-во мест в группах, 
      и кол-во необходимых мест введенных пользователем.
  Если была найдена группа в которой количество мест больше либо равно необходимому, 
  вывести сообщение через confirm, что есть место в группе такой-то, согласен ли 
  пользоваетель быть в этой группе?
    * Если ответ да, показать alert с текстом 'Приятного путешествия в группе <имя группы>'
    * Если ответ нет, показать alert с текстом 'Нам очень жаль, приходите еще!'
  
  Если мест нигде нет, показать alert с сообщением 'Извините, столько мест нет ни в одной группе!'
*/
"use strict";
const TABA = 6;
const nameTaba = 'TABA';
const SHARM = 15;
const nameSharm = 'SHARM';
const HURGADA = 25;
const nameHurgada = 'HURGADA';

let userPlaces = prompt('Введите необходимое количество мест');
if (userPlaces === null) { alert('Отменено пользователем!') }
else {
  if (Number.isNaN(Number(userPlaces))) { alert('Ошибка ввода!') }
  else {
    const validUserPlaces = Number(userPlaces);
    if ((Number.isInteger(validUserPlaces)) && validUserPlaces > 0) {
      switch (true) {
        case (validUserPlaces <= TABA):
          if (confirm(`Вы согласны быть в группе ${nameTaba}?`)) {
            alert(`Приятного путешествия в группе ${nameTaba}!`);
            break;
          }
        case validUserPlaces <= SHARM:
          if (confirm(`Вы согласны быть в группе ${nameSharm}?`)) {
            alert(`Приятного путешествия в группе ${nameSharm}!`);
            break;
          }
        case validUserPlaces <= HURGADA:
          if (confirm(`Вы согласны быть в группе ${nameHurgada}?`)) {
            alert(`Приятного путешествия в группе ${nameHurgada}!`);
            break;
          }
          else {
            alert('Нам очень жаль, приходите еще!');
            break;
          };
        default:
          alert('Извините, столько мест нет ни в одной группе!');
      }
    }
    else { alert('Ошибка ввода!') }
  }
}
