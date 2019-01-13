"use strict";
/*
Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      */

const galleryItems = [{
  preview: 'img/preview-1.jpeg',
  fullview: 'img/fullview-1.jpeg',
  alt: "alt text 1"
},
{
  preview: 'img/preview-2.jpeg',
  fullview: 'img/fullview-2.jpeg',
  alt: "alt text 2"
},
{
  preview: 'img/preview-3.jpeg',
  fullview: 'img/fullview-3.jpeg',
  alt: "alt text 3"
},
{
  preview: 'img/preview-4.jpeg',
  fullview: 'img/fullview-4.jpeg',
  alt: "alt text 4"
},
{
  preview: 'img/preview-5.jpeg',
  fullview: 'img/fullview-5.jpeg',
  alt: "alt text 5"
},
];

const galleryItems2 = [{
  preview: 'img/preview-6.jpeg',
  fullview: 'img/fullview-6.jpeg',
  alt: "alt text 6"
},
{
  preview: 'img/preview-7.jpeg',
  fullview: 'img/fullview-7.jpeg',
  alt: "alt text 7"
},
{
  preview: 'img/preview-8.jpeg',
  fullview: 'img/fullview-8.jpeg',
  alt: "alt text 8"
},
{
  preview: 'img/preview-9.jpeg',
  fullview: 'img/fullview-9.jpeg',
  alt: "alt text 9"
},
{
  preview: 'img/preview-10.jpeg',
  fullview: 'img/fullview-10.jpeg',
  alt: "alt text 10"
},
];

document.addEventListener("DOMContentLoaded", createGallery(galleryItems));
const gallery = document.querySelector('.js-image-gallery');

function createFullViewImg() {
  const fullView = document.createElement('div');
  fullView.classList.add('fullview');
  return fullView;
}

function createPreview() {
  const preview = document.createElement('ul');
  preview.classList.add('preview');
  preview.addEventListener('click', galleryClickHandler);
  return preview;
}

function createGallery(galleryItems) {
  const defaultActiveItem = 0;
  const gallery = document.querySelector('.js-image-gallery');
  const fullView = createFullViewImg();
  const fullViewImg = createImg(galleryItems[defaultActiveItem]);
  const startFullViewPath = galleryItems[defaultActiveItem].fullview;
  setFullviewImg(fullViewImg, startFullViewPath);
  const preview = createPreview();
  const galleryImg = [];
  galleryItems.forEach(item => {
    const previewItem = createPreviewItem();
    preview.appendChild(previewItem);
    const previewImg = createImg(item);
    galleryImg.push(previewImg);
    previewItem.appendChild(previewImg);
  });
  setCurrPrevImg(galleryImg, galleryImg[defaultActiveItem]);
  fullView.appendChild(fullViewImg);
  gallery.appendChild(fullView);
  gallery.appendChild(preview);
}

function createPreviewItem() {
  return document.createElement('li');
}

function createImg(item) {
  const newImg = document.createElement('img');
  newImg.setAttribute('src', item.preview);
  newImg.setAttribute('data-fullview', item.fullview);
  newImg.setAttribute('alt', item.alt);
  return newImg;
}

function setFullviewImg(fullViewImg, path) {
  return fullViewImg.setAttribute('src', path);
}

function setCurrPrevImg(currGalleryImg, currImg) {
  currGalleryImg.forEach(item => item.classList.remove('active-img'));
  currImg.classList.add('active-img');
}

function galleryClickHandler(event) {
  if (event.target.nodeName !== 'IMG') return;
  const chosenImgFullViewPath = event.target.attributes['data-fullview'].value;

  const fullImg = event.target.parentNode.parentNode.previousSibling.firstElementChild;
  setFullviewImg(fullImg, chosenImgFullViewPath);

  const currGall = event.target.parentNode.parentNode;

  const currGallArr = Array.of(...currGall.children);

  const currGallArrImg = currGallArr.reduce((acc, current) => acc.concat(current.firstElementChild), []);

  setCurrPrevImg(currGallArrImg, event.target);
}

const newGallery = createGallery(galleryItems2);
