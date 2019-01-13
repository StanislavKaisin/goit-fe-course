"use strict";

/*ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ*/

const galleryItems3 = [
  {
    preview: "img/preview-1.jpeg",
    fullview: "img/fullview-1.jpeg",
    alt: "alt text 1"
  },
  {
    preview: "img/preview-2.jpeg",
    fullview: "img/fullview-2.jpeg",
    alt: "alt text 2"
  },
  {
    preview: "img/preview-3.jpeg",
    fullview: "img/fullview-3.jpeg",
    alt: "alt text 3"
  },
  {
    preview: "img/preview-4.jpeg",
    fullview: "img/fullview-4.jpeg",
    alt: "alt text 4"
  },
  {
    preview: "img/preview-5.jpeg",
    fullview: "img/fullview-5.jpeg",
    alt: "alt text 5"
  }
];

const galleryItems4 = [
  {
    preview: "img/preview-6.jpeg",
    fullview: "img/fullview-6.jpeg",
    alt: "alt text 6"
  },
  {
    preview: "img/preview-7.jpeg",
    fullview: "img/fullview-7.jpeg",
    alt: "alt text 7"
  },
  {
    preview: "img/preview-8.jpeg",
    fullview: "img/fullview-8.jpeg",
    alt: "alt text 8"
  },
  {
    preview: "img/preview-9.jpeg",
    fullview: "img/fullview-9.jpeg",
    alt: "alt text 9"
  },
  {
    preview: "img/preview-10.jpeg",
    fullview: "img/fullview-10.jpeg",
    alt: "alt text 10"
  }
];

/*ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ*/

class Gallery {
  constructor(object) {
    this.items = object.items;
    this.parentNode = object.parentNode;
    this.defaultActiveItem = object.defaultActiveItem;

    this.createFullView = function() {
      const fullview = document.createElement("div");
      fullview.classList.add("fullview");
      return fullview;
    };

    this.createImg = function(item) {
      const newImg = document.createElement("img");
      newImg.setAttribute("src", item.preview);
      newImg.setAttribute("data-fullview", item.fullview);
      newImg.setAttribute("alt", item.alt);
      return newImg;
    };

    this.setFullviewImg = function(fullViewImg, path) {
      return fullViewImg.setAttribute("src", path);
    };

    this.setCurrPrevImg = function(currGalleryImg, currImg) {
      currGalleryImg.forEach(item => item.classList.remove("active-img"));
      currImg.classList.add("active-img");
    };

    this.galleryClickHandler = function(event) {
      if (event.target.nodeName !== "IMG") return;

      const chosenImgFullViewPath =
        event.target.attributes["data-fullview"].value;

      const fullImg =
        event.target.parentNode.parentNode.previousSibling.firstElementChild;

      this.setFullviewImg(fullImg, chosenImgFullViewPath);

      const currGall = event.target.parentNode.parentNode;

      const currGallArr = Array.of(...currGall.children);

      const currGallArrImg = currGallArr.reduce(
        (acc, current) => acc.concat(current.firstElementChild),
        []
      );

      this.setCurrPrevImg(currGallArrImg, event.target);
    };

    this.createPreview = function() {
      const preview = document.createElement("ul");
      preview.classList.add("preview");
      preview.addEventListener("click", this.galleryClickHandler.bind(this));
      return preview;
    };

    this.createPreviewItem = function() {
      return document.createElement("li");
    };

    this.checkDefaultActiveItem = function() {
      let checkedDefaultImg;
      if (this.defaultActiveItem > (this.items.length-1)) {
        checkedDefaultImg = 0;
      } else {
        checkedDefaultImg = this.defaultActiveItem;
      };
      return checkedDefaultImg;
    };

    this.createGallery = function(items) {
      const gallery = this.parentNode;

      const fullView = this.createFullView();

      const startFullViewImg = this.checkDefaultActiveItem();

      const fullViewImg = this.createImg(this.items[startFullViewImg]);

      const startFullViewPath = this.items[startFullViewImg].fullview;
      this.setFullviewImg(fullViewImg, startFullViewPath);

      const preview = this.createPreview();

      const galleryImg = [];
      items.forEach(item => {
        const previewItem = this.createPreviewItem();
        preview.appendChild(previewItem);
        const previewImg = this.createImg(item);
        galleryImg.push(previewImg);
        previewItem.appendChild(previewImg);
      });

      this.setCurrPrevImg(galleryImg, galleryImg[startFullViewImg]);

      fullView.appendChild(fullViewImg);
      gallery.appendChild(fullView);
      gallery.appendChild(preview);
    };
    this.createGallery(this.items);
  }
}

const newGallery3 = new Gallery({
  items: galleryItems3,
  parentNode: document.querySelector(".image-gallery"),
  defaultActiveItem: 3
});

const newGallery4 = new Gallery({
  items: galleryItems4,
  parentNode: document.querySelector(".image-gallery"),
  defaultActiveItem: 1222
});

