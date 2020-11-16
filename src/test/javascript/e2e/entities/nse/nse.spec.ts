import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NSEComponentsPage from './nse.page-object';
import NSEUpdatePage from './nse-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('NSE e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let nSEComponentsPage: NSEComponentsPage;
  let nSEUpdatePage: NSEUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    nSEComponentsPage = new NSEComponentsPage();
    nSEComponentsPage = await nSEComponentsPage.goToPage(navBarPage);
  });

  it('should load NSES', async () => {
    expect(await nSEComponentsPage.title.getText()).to.match(/NSES/);
    expect(await nSEComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete NSES', async () => {
    const beforeRecordsCount = (await isVisible(nSEComponentsPage.noRecords)) ? 0 : await getRecordsCount(nSEComponentsPage.table);
    nSEUpdatePage = await nSEComponentsPage.goToCreateNSE();
    await nSEUpdatePage.enterData();

    expect(await nSEComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(nSEComponentsPage.table);
    await waitUntilCount(nSEComponentsPage.records, beforeRecordsCount + 1);
    expect(await nSEComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await nSEComponentsPage.deleteNSE();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(nSEComponentsPage.records, beforeRecordsCount);
      expect(await nSEComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(nSEComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
