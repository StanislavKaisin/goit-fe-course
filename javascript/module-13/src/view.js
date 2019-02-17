import EventEmitter from './services/event-emitter';
import URLCardTemplate from './templates/URLCardTemplate.hbs';

export default class View extends EventEmitter {
  constructor() {
    super();

    this.result = document.querySelector('.js-result>ul');
    this.inputForm = document.querySelector('.js-form--id');

    document.addEventListener("DOMContentLoaded", this.fromLocalGet.bind(this));
    this.inputForm.addEventListener('submit', this.handleInputURL.bind(this));
    this.result.addEventListener('click', this.handleDelCard.bind(this));
  }

  fromLocalGet() {
    this.emit('onDOMContentLoaded');
  }

  updateCardsList(URLCardsList) {
    let markup = '';
    markup = URLCardsList.reduce((markup, item) => markup + URLCardTemplate(item), '');
    return this.result.innerHTML = markup;
  }

  clearInput(event) {
    return event.target[0].value = '';
  }

  handleInputURL(event) {
    event.preventDefault();
    let input = event.target[0];
    let inputURL = input.value;
    this.emit('onInputURL', inputURL);
    this.clearInput(event);
  }

  handleDelCard(event) {
    if (event.target.nodeName === 'BUTTON') {
      event.preventDefault();
      let deletedCard = event.target.attributes.cardname.value;
      this.emit('onDelCard', deletedCard);
    }
  }
}
