"use strict";
/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-1.com"
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-2.com"
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: "link-3.com"
  }
];

function $docrEl(element) {
  return document.createElement(element);
}
function $apCh(parent, element) {
  return parent.appendChild(element);
}
function $cLiAd(element, className = text) {
  return element.classList.add(className);
}
function $text(element, text) {
  return (element.textContent = text);
}

function createPostCard(post) {
  let text;

  text = "div";
  let movie = $docrEl(text);
  text = "movie";
  $cLiAd(movie, text);

  text = "img";
  let movie__image = $docrEl(text);
  text = post.img;
  movie__image.setAttribute("src", text);
  movie__image.setAttribute("alt", "movie image");
  text = "movie__image";
  $cLiAd(movie__image, text);
  $apCh(movie, movie__image);

  text = "div";
  let movie__body = $docrEl(text);

  $cLiAd(movie__body, "movie__body");
  $apCh(movie, movie__body);

  let movie__title = $docrEl("h2");
  text = post.title;
  $text(movie__title, text);
  $cLiAd(movie__title, "movie__title");
  $apCh(movie__body, movie__title);

  let movie__description = $docrEl("p");
  text = post.text;
  $text(movie__description, text);
  text = "movie__description";
  $cLiAd(movie__description, text);
  $apCh(movie__body, movie__description);

  let movie__link = $docrEl("a");
  text = post.link;
  movie__link.setAttribute("href", text);
  movie__link.setAttribute("target", "_blank");
  $text(movie__link, text);
  $apCh(movie__body, movie__link);

  return movie;
}

function createCards(posts) {
  let result = [];
  result = posts.reduce(
    (acc, element) => acc.concat(createPostCard(element)),
    []
  );
  console.log("result=", result);
  return result;
}

const newPosts = createCards(posts);
const films__posts = document.querySelector(".films__posts");
films__posts.append(...newPosts);
