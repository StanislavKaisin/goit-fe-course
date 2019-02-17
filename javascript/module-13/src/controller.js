export default class Controller {
  constructor (model, view) {
    this.model = model;
    this.view = view;

    view.on('onDOMContentLoaded', this.fromStorage.bind(this));
    view.on('onInputURL', this.onInputURL.bind(this));
    view.on('onDelCard', this.onDelCard.bind(this));
  }
  fromStorage () {
    this.model.fromLocalGet();
    this.view.updateCardsList(this.model.URLCardsList);
  }
  onInputURL(inputURL) {
    this.model.checInputURL(inputURL)
      .then((resolve, reject) => {
        this.view.updateCardsList(this.model.URLCardsList);
      });
  }
  onDelCard (deletedCard) {
    this.model.deleteThisCard(deletedCard);
    this.view.updateCardsList(this.model.URLCardsList);
  }
}
