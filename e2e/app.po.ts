import { $, browser } from 'protractor';

export class AppPage {
  navigateTo(path?: string) {
    return browser.get(path || '/');
  }

  getNavBar() {
    return $('clue-nav-bar');
  }

  getFooter() {
    return $('clue-footer');
  }
}
