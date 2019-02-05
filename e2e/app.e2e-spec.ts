import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('clue App', () => {
  let page: AppPage;

  // Protractor does not currently support websockets,
  // so using AngularFire prevents e2e tests of working
  // https://github.com/angular/angularfire2/issues/1345
  // https://github.com/angular/angularfire2/issues/1347
  // TODO: remove when it does
  browser.waitForAngularEnabled(false);

  beforeEach(() => {
    page = new AppPage();
  });

  describe('nav-bar', () => {

    it('should exist', () => {
      page.navigateTo();
      expect(page.getNavBar().isDisplayed()).toBe(true);
    });

    it('should display the logo', () => {
      page.navigateTo();
      const logo = page.getNavBar().$('.logo img');
      expect(logo.isDisplayed()).toBe(true);
      expect(logo.getAttribute('src')).toContain('assets/logo/clue-128x64.png');
    });

    it('should be colored #2196f3', () => {
      const color = page.getFooter().$('.mat-toolbar').getCssValue('background-color');
      expect(color).toBe('rgba(35, 31, 32, 1)');
    });

  });

  describe('footer', () => {

    it('should exist', () => {
      expect(page.getFooter().isDisplayed()).toBe(true);
    });

    it('should be colored #231f20', () => {
      const color = page.getFooter().$('.mat-toolbar').getCssValue('background-color');
      expect(color).toBe('rgba(35, 31, 32, 1)');
    });

    it('should have a link to GitHub', () => {
      const link = page.getFooter().$('a[alt="GitHub"]');
      expect(link.isDisplayed()).toBe(true);
      expect(link.getAttribute('href')).toContain('https://github.com/rabelloo');

      const img = link.$('img');
      expect(img.isDisplayed()).toBe(true);
      expect(img.getAttribute('src')).toContain('assets/github.svg');
    });

  });

});
