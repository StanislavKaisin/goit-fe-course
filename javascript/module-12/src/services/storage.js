export function toLocalSet(URLCardsList) {
  try {
    localStorage.setItem("URLCardsList", JSON.stringify(URLCardsList));
  } catch (exeption) {
    console.error("Error during writing to localstorage", exeption.message);
  }
}

export function fromLocalGet() {
  try {
    let URLFromLocalStorage = JSON.parse(localStorage.getItem("URLCardsList"));
    if (!URLFromLocalStorage) {
      console.log('Local Storage is empty');
      URLCardsList = null;
      return URLCardsList;
    }
    let URLCardsList = URLFromLocalStorage;
    return URLCardsList;
  } catch (exeption) {
    console.error("Error during reading from localstorage", exeption.message);
  }
}
