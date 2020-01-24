import { AppPage } from './app.po';
import { browser, logging } from 'protractor';
import { async } from 'q';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display header and footer', () => {
    expect(page.getTitleText()).toEqual('GIPHY SEARCH APPLICATION');
    expect(page.getAuthorText()).toEqual('Author: Mageshwaran Nathan');
  });

  it('should display error message on swear words', () => {
    page.searchQuery('fuck u');
    expect(page.getErrorText()).toEqual('Contains swear words');
  });

  it('should display giffs on valid words', () => {
    page.searchQuery('puppies');
    let list = page.getAllGiffs();
    expect(list.count()).toBe(10);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
