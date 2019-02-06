"use strict";
/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  
  Есть массив объектов (дальше в задании), каждый из которых описывает 
  ноутбук с определенными характеристиками.
  
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы 
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал 
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам. 
  
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
    
  После чего выберите из массива только те объекты, которые подходят 
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается, 
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/

const laptops = [
  {
    size: 13,
    color: "white",
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "gray",
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 13,
    color: "black",
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "white",
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "gray",
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 15,
    color: "black",
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "white",
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "gray",
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  },
  {
    size: 17,
    color: "black",
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: "http://demo.posthemes.com/pos_zadademo/images/placeholder.png",
    descr:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae."
  }
];

let form = document.querySelector(".js-form");
form.addEventListener("submit", onSubmitHandler);
let resetButton = document.querySelector(".js-reset");
resetButton.addEventListener("click", onResetHandler);

function filterGoods(filter) {
  let properties = Object.keys(filter);
  let filteredArray = laptops;
  properties.forEach(property => {
    if (filter[property].length)
      return (filteredArray = filteredArray.filter(laptop => {
        if (filter[property].includes(String(laptop[property]))) {
          return laptop;
        }
      }));
  });
  return filteredArray;
}

function getCheckedInputs(event) {
  let resultsArray = [...event.target.elements];
  let inputs = resultsArray.reduce((acc, item) => {
    if (item.nodeName === "INPUT") {
      return (acc = acc.concat(item));
    } else return acc;
  }, []);
  let checkedInputs = inputs.reduce((acc, item) => {
    if (item.checked) {
      return (acc = acc.concat(item));
    } else return acc;
  }, []);
  return checkedInputs;
}

function getFilter(checkedInputs, filter) {
  checkedInputs.forEach(input => {
    filter[input.name].push(input.value);
  });
  return filter;
}

function onSubmitHandler(event) {
  event.preventDefault();
  showResultsHeader(event);
  clearResults(event);
  let checkedInputs = getCheckedInputs(event);
  let filter = { size: [], color: [], release_date: [] };
  filter = getFilter(checkedInputs, filter);
  let result = filterGoods(filter);
  return updateResults(result);
}

function showResultsHeader(event) {
  let resultsHeader = document.querySelector(".js-product-list-header");
  if (resultsHeader.classList.contains("hidden"))
    resultsHeader.classList.remove("hidden");
}

function hideResultsHeader(event) {
  let resultsHeader = document.querySelector(".js-product-list-header");
  if (!resultsHeader.classList.contains("hidden"))
    resultsHeader.classList.add("hidden");
}

function updateResults(resultsArray) {
  let source = document.querySelector("#product-item").innerHTML.trim();
  let template = Handlebars.compile(source);
  let markup = resultsArray.reduce(
    (markup, item) => markup.concat(template(item)),
    ""
  );
  let root = document.querySelector(".js-product-list");
  return root.insertAdjacentHTML("afterbegin", markup);
}

function clearResults(event) {
  let root = document.querySelector(".js-product-list");
  return (root.innerHTML = "");
}

function onResetHandler(event) {
  hideResultsHeader(event);
  clearResults(event);
}
