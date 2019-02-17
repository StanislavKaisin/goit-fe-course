import * as storage from './services/storage';

export default class Model {
  constructor(URLCardsList = []) {
    this.APIKEY = '5c6070bbacc99ae473f5630fed11166e035117fd0a863';
    this.URLCardsList = URLCardsList;
  }

  fromLocalGet() {
    let URLCardsFromStorage = storage.fromLocalGet();
    if (URLCardsFromStorage !== null) {
      this.URLCardsList = URLCardsFromStorage;
      return this.URLCardsList;
    } else return;
  }

  getPreviewInfo(URL) {
    return fetch(`https://api.linkpreview.net/?key=${this.APIKEY}&q=${URL}`)
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
        this.URLCardsList.unshift(URLCard);
        storage.toLocalSet(this.URLCardsList);
      })
      .catch(error => console.log(error));
  }

  checkURLList(newURL) {
    let URLindex = this.URLCardsList.find(URLCard => URLCard.url === newURL);
    return URLindex;
  }

  checkValidURL(inputURL) {
    let pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    let result = pattern.test(inputURL);
    return result;
  }

  checInputURL(inputURL) {
    let checked = this.checkValidURL(inputURL);
    if (checked) {
      let isURL = this.checkURLList(inputURL);
      if (isURL === undefined) {
        return this.getPreviewInfo(inputURL);
      } else {
        alert("Введенный адрес уже есть в коллекции!");
        return;
      }
    } else {
      alert('Entered wrong URL!');
      return;
    };
  }

  deleteThisCard(deletedCard) {
    this.URLCardsList = this.URLCardsList.filter(URLCard => deletedCard !== URLCard.url);
    storage.toLocalSet(this.URLCardsList);
    return this.URLCardsList;
  }
}
