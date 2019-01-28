"use strict";
/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:

  1. функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  2. функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  3. функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  4. функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  5. функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
    
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  6. Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/

const API_URL = 'https://test-users-api.herokuapp.com/users/';

function getAllUsers() {
  return fetch(API_URL)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error fetching data");
    })
    .catch(err => {
      console.error("Error: ", err);
    });
}

function getUserById(id) {
  let userRequest = id;
  if (!userRequest) {
    throw new Error(`Ошибка! Пользователя с таким id не существует`);
  } else {
    return fetch(API_URL + id)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error fetching data");
      })
      .catch(err => {
        console.error("Error: ", err);
      });
  }
}

function addUser(newUser) {
  return fetch("https://test-users-api.herokuapp.com/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .catch(error => console.log('ERROR' + error));
}


function removeUser(id) {
  return fetch(API_URL + id, { method: 'DELETE' })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error while fetching: ${response.statusText}`)
    })
    .catch(error => console.log('ERROR' + error));
}

function updateUser(id, user) {
  return fetch(API_URL + id, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => response.json())
    .catch(error => console.log('ERROR' + error));
}

let buttonAllUsers = document.querySelector(".js-button--all");
buttonAllUsers.addEventListener("click", handleClickAllUsers);
let usersTable = document.querySelector(".users-table>tBody");

let getUserByIdForm = document.querySelector(".js-form--id");
getUserByIdForm.addEventListener("submit", handleSubmitGetUser);
let getUserByIdInput = document.querySelector(".js-form--id>input");

let addUserForm = document.querySelector(".js-form--add");
addUserForm.addEventListener("submit", handleSubmitaddUser);

let deleteUser = document.querySelector(".js-form--del");
deleteUser.addEventListener("submit", handleDeleteUser);

let changeUserInfo = document.querySelector(".js-form--change");
changeUserInfo.addEventListener("submit", handlechangeUserInfo);

function handleClickAllUsers(event) {
  event.preventDefault();
  getAllUsers().then(data => {
    if (data.errors.length !== 0) {
      errorMessagesShow(data, event);
      return
    }
    let allUsers = data.data;
    let resultText = "";
    allUsers.forEach(element => {
      resultText = resultText + createTableRow(element);
    });
    usersTable.innerHTML = resultText;
  });
}

function handleSubmitGetUser(event) {
  event.preventDefault();
  event.target.nextElementSibling.innerHTML = '';
  if (checkInputs (event)) return;
  let userInput = getUserByIdInput.value;
  getUserById(userInput).then(data => {
      if (data.errors.length !== 0) {
        errorMessagesShow(data, event);
        return
      }
      if (data.errors.length === 0) {
        let resultText;
        let tableRow = createTableRow(data.data)
        resultText = `<table class="users-table">
      <thead><tr><th>Имя</th><th>Возраст</th><th>id</th></tr></thead>
      <tbody>${tableRow}</tbody>`;
        this.nextElementSibling.innerHTML = resultText;
      };

    })
    .catch(err => {
      console.log("Error: ", err)
    });
  clearFormInputs(event);
}

function handleSubmitaddUser(event) {
  event.preventDefault();
  event.target.nextElementSibling.innerHTML = "";
  if (checkInputs (event)) return;
  let newUser = takeUserInfo(event);
  addUser(newUser)
    .then(response => response.json())
    .then(data => {
      if (data.errors.length !== 0) {
        errorMessagesShow(data, event);
        return
      };
      let resultText;
      let tableRow = createTableRow(data.data);
      resultText = `
      <table class="users-table">
      <thead><tr><th colspan="3">Добавлен пользователь</th></tr></thead>
      <tr><th>Имя</th><th>Возраст</th><th>id</th></tr></tr>
      <tbody>${tableRow}</tbody>
      </table>`;
      this.nextElementSibling.innerHTML = resultText;
    })
    .catch(error => console.log("ERROR" + error));
  clearFormInputs(event);
}

function handleDeleteUser(event) {
  event.preventDefault();
  event.target.nextElementSibling.innerHTML = '';
  if (checkInputs (event)) return;
  let id = event.target.firstElementChild.value;
  removeUser(id)
    .then(data => {
      if (data.errors.length !== 0) {
        errorMessagesShow(data, event);
        return
      }
      if (data.data === null) {
        let resultText = `
         <table class="users-table">
         <thead><tr><th colspan="3">Пользователь c id ${id} не найден</th></tr></thead>
          </table>`;
        this.nextElementSibling.innerHTML = resultText;
        return;
      }
      let resultText;
      let tableRow = createTableRow(data.data)
      resultText = `
      <table class="users-table">
      <thead><tr><th colspan="3">Удален пользователь</th></tr></thead>
      <tr><th>Имя</th><th>Возраст</th><th>id</th></tr></tr>
      <tbody>${tableRow}</tbody>
      </table>`;
      this.nextElementSibling.innerHTML = resultText;
    });
  clearFormInputs(event);
};

function handlechangeUserInfo(event) {
  event.preventDefault();
  event.target.nextElementSibling.innerHTML = '';
  if (checkInputs (event)) return;
  let id = event.target.firstElementChild.value;
  let updatedUser = takeUserInfo(event);
  updateUser(id, updatedUser)
    .then(data => {
      if (data.errors.length !== 0) {
        errorMessagesShow(data, event);
        return
      }
      let resultText;
      let tableRow = createTableRow(data.data)
      resultText = `
      <table class="users-table">
      <thead><tr><th colspan="3">Изменены данные пользователя</th></tr></thead>
      <tr><th>Имя</th><th>Возраст</th><th>id</th></tr></tr>
      <tbody>${tableRow}</tbody>
      </table>`;
      event.target.nextElementSibling.innerHTML = resultText;
    })
    .catch(error => console.log('ERROR' + error));
  clearFormInputs(event);
}


function errorMessagesTake(data) {
  return data.errors.reduce((acc, elem) => acc.concat(elem), "");
}

function errorMessagesShow(data, event) {
  let errorText = errorMessagesTake(data);
  let resultText = `<table class="users-table">
      <thead>
       <tr>
       <th>${errorText}</th>
       </tr>
      </thead>`;
  event.target.nextElementSibling.innerHTML = resultText;
}


function createTableRow(data) {
  let tableRow;
  let { name, age, id } = data;
  if (data.hasOwnProperty("_id")) {
    id = data._id;
  } else {
    id = data.id;
  }
  tableRow = `<tr><th>${name}</th><th>${age}</th><th>${id}</th></tr>`;
  return tableRow;
}

function takeAllInputs(event) {
  let targetProperties = [...event.target.children];
  let inputs = targetProperties.reduce((acc, curr) => {
    if (curr.nodeName === 'INPUT') {
      acc = acc.concat(curr);
    }
    return acc;
  }, []);
  return inputs;
}

function clearFormInputs(event) {
  let currentInputs = takeAllInputs(event);
  return currentInputs.forEach(input => input.value = '');
}

function takeUserInfo(event) {
  let newUser = {};
  let inputs = takeAllInputs(event);
  let nameField = inputs.find(current => {
    if (current.placeholder.includes('имя')) return current;
  });
  let ageField = inputs.find(current => {
    if (current.placeholder.includes('возраст')) return current;
  });
  if (nameField.value === '') {
    let resultText = `<table class="users-table">
      <thead>
       <tr>
       <th>Введите имя пользователя</th>
       </tr>
      </thead>`;
    event.target.nextElementSibling.insertAdjacentHTML('beforeend', resultText);
    return;
  } else {
    newUser.name = nameField.value;
  }
  if (!ageField.value || Number.isNaN(Number(ageField.value)) || ageField.value <= 0) {
    let resultText = `<table class="users-table">
      <thead>
       <tr>
       <th>Возраст пользователя должен быть положительным числом</th>
       </tr>
      </thead>`;
    event.target.nextElementSibling.insertAdjacentHTML('beforeend', resultText);
    return;
  } else {
    newUser.age = ageField.value;
  }
  return newUser;
}

function checkInputs (event) {
  let inputs = takeAllInputs(event);
  let emptyField = inputs.find (input=> {
    if (input.value==='') {return true}
  })
  if (emptyField) {
    let resultText=
    `<table class="users-table">
      <thead>
       <tr>
       <th>Поле с данными заполнено неверно</th>
       </tr>
      </thead>`;
    event.target.nextElementSibling.insertAdjacentHTML('beforeend', resultText);
    return true;
  }
  return false;
}
