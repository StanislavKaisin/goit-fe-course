import {
  Model
} from "../model";

describe("Model class from module 13", () => {

  test("Should create element class", () => {
    const model = new Model();
    expect(model instanceof Model).toBe(true);
  });

  test("Should create element class with empty array", () => {
    const model = new Model();
    expect(model.URLCardsList).toEqual([]);
  });

  test("Should create element class with definite array", () => {
    const model = new Model([
      "https://www.google.com.ua",
      "https://uk.wikipedia.org"
    ]);
    expect(model.URLCardsList).toEqual([
      "https://www.google.com.ua",
      "https://uk.wikipedia.org"
    ]);
  });

  test("Should create element class with definite key", () => {
    const model = new Model();
    expect(model.APIKEY).toBe("5c6070bbacc99ae473f5630fed11166e035117fd0a863");
  });

  test("Should validate valide URL", () => {
    const model = new Model();
    expect(model.checkValidURL("https://www.google.com.ua")).toBe(true);
  });

  test("Should not validate invalide URL", () => {
    const model = new Model();
    expect(model.checkValidURL("@https://www.google.com.ua")).toBe(false);
  });

  test("Should not match existed URL", () => {
    const model = new Model([
      "https://www.google.com.ua",
      "https://uk.wikipedia.org"
    ]);
    expect(model.checkURLList("https://uk.wikipedia.org")).toBeDefined();
  });

  test("Should match that URL is not existed", () => {
    const model = new Model([
      "https://www.google.com.ua",
      "https://uk.wikipedia.org"
    ]);
    expect(model.checkURLList("https://developer.mozilla.org")).toBeUndefined();
  });

  test("Should check inputed URL in the list", () => {
    const model = new Model([
      "https://www.google.com.ua",
      "https://uk.wikipedia.org"
    ]);
    expect(model.checInputURL("https://www.google.com.ua")).toBe(false);
  });

  test("Should delete URL from list", () => {
    const model = new Model([
      "https://www.google.com.ua",
      "https://uk.wikipedia.org", 
      "https://developer.mozilla.org"
    ]);
    expect(model.deleteThisCard("https://www.google.com.ua"))
    .toEqual([
      "https://uk.wikipedia.org",
      "https://developer.mozilla.org"
    ]);
  });
})
