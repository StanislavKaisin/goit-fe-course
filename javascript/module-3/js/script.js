/*
  Есть массив logins с логинами пользователей. Напишите скрипт добавления логина в массив logins.
  
  Добавляемый логин должен:
    - проходить проверку на длину от 4 до 16-ти символов включительно
    - быть уникален, то есть отсутствовать в массиве logins
 
  🔔 Разбейте задачу на подзадачи с помощью функций.
  
  Напишите функцию isLoginValid(login), в которой проверьте количество символов 
  параметра login и верните true или false в зависимости от того, попадает ли длина параметра 
  в заданный диапазон от 4-х до 16-ти символов включительно.
 
  Создайте функцию isLoginUnique(allLogins, login), которая принимает логин и список 
  всех логинов как параметры и проверяет наличие login в массиве allLogins, возвращая true 
  если такого логина еще нет и false если логин уже используется.
  Далее напишите функцию addLogin(logins, login) которая:
    - Принимает новый логин и массив всех логинов как параметры
    - Проверяет валидность логина используя вспомогательную функцию isLoginValid
    - Если логин не валиден, прекратить исполнение функции addLogin 
      и вернуть строку 'Ошибка! Логин должен быть от 4 до 16 символов'
    - Если логин валиден, функция addLogin проверяеть уникальность логина 
      с помощью функции isLoginUnique
    - Если isLoginUnique вернет true, addLogin добавляет новый логин 
       в logins и возвращает строку 'Логин успешно добавлен!'
    - Если isLoginUnique вернет false, тогда addLogin не добавляет 
       логин в массив и возвращает строку 'Такой логин уже используется!'
       
  🔔 Принцип единственной ответственности функции - каждая функция делает что-то одно. Это 
     позволяет переиспользовать код и изменять логику работы функции только в одном месте, 
     не затрагивая работу программы в целом. Предикатные функции возвращают только true или 
     false. Такие функции принято называть начиная с is: isLoginUnique и isLoginValid в нашем случае.
      - isLoginUnique только проверяет есть ли такой логин в массиве и возвращает true или false. 
      - isLoginValid только проверяет валидный ли логин и возвращает true или false.
      - addLogin добавляет или не добавляет логин в массив. При этом для проверок условия добавления 
        используются результаты вызовов других функций - isLoginUnique и isLoginValid.
*/
"use strict";

const logins = [
  "0000",
  "Mango",
  "robotGoogles",
  "Poly",
  "Aj4x1sBozz",
  "qwerty123"
];
let test;
let login;

const isLoginNull = login => {
  if (login === null) {
    console.log("Ввод отменен.");
    return true;
  } else {
    return false;
  }
};

const isLoginNaN = login => {
  if (login === undefined) {
    return true;
  } else {
    return false;
  }
};

const isLoginLength = login => {
  if (login !== "" && login.length >= 4 && login.length <= 16) {
    return true;
  } else {
    return false;
  }
};

const isLoginValid = function(login) {
  if (!isLoginNull(login) && !isLoginNaN(login)) {
    if (isLoginLength(login)) {
      return true;
    } else {
      console.log(
        "Ошибка! Логин должен быть от 4 до 16 символов. Количество символов которые Вы ввели: " +
          login.length
      );
      return false;
    }
  } else {
     return false;
  }
};

const isLoginUnique = function(allLogins, login) {
  if (isLoginValid(login) && !logins.includes(login)) {
    return true;
  } else {
    return false;
  }
};

const addLogin = function (login) {
  let message;
  if (isLoginValid(login)) {
    if (isLoginUnique(logins, login)) {
      message = "Логин успешно добавлен!";
      logins.push(login);
      console.log(message);
      return;
    } else {
      message = 'Такой логин уже используется!';
      console.log(message);
      return;
    }
  }
};

// test = addLogin(prompt('Enter login'));
// console.log('logins= ' + logins);

// Вызовы функции для проверки
// addLogin('Ajax'); // 'Логин успешно добавлен!'
// console.log('logins= ' + logins);
// addLogin("robotGoogles"); // 'Такой логин уже используется!'
// console.log('logins= ' + logins);
// addLogin("Zod"); // 'Ошибка! Логин должен быть от 4 до 16 символов'
// console.log('logins= ' + logins);
// addLogin('jqueryisextremelyfast'); // 'Ошибка! Логин должен быть от 4 до 16 символов'
// console.log('logins= ' + logins)
