import { browser, by, element, Key } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('giphy-root a')).getText() as Promise<string>;
  }

  getAuthorText() {
    return element(by.id('authorName')).getText() as Promise<string>;
  }

  searchQuery(query) {
    element(by.id('searchInput')).sendKeys(query);
    element(by.id('searchInput')).sendKeys(Key.TAB);
  }

  getErrorText() {
    return element(by.id('mat-error-1')).getText() as Promise<string>;
  }

  getAllGiffs() {
    return element.all(by.css('img'));
  }
}
