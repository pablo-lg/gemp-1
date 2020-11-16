import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ObraComponentsPage from './obra.page-object';
import ObraUpdatePage from './obra-update.page-object';
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

describe('Obra e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let obraComponentsPage: ObraComponentsPage;
  let obraUpdatePage: ObraUpdatePage;

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
    obraComponentsPage = new ObraComponentsPage();
    obraComponentsPage = await obraComponentsPage.goToPage(navBarPage);
  });

  it('should load Obras', async () => {
    expect(await obraComponentsPage.title.getText()).to.match(/Obras/);
    expect(await obraComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Obras', async () => {
    const beforeRecordsCount = (await isVisible(obraComponentsPage.noRecords)) ? 0 : await getRecordsCount(obraComponentsPage.table);
    obraUpdatePage = await obraComponentsPage.goToCreateObra();
    await obraUpdatePage.enterData();

    expect(await obraComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(obraComponentsPage.table);
    await waitUntilCount(obraComponentsPage.records, beforeRecordsCount + 1);
    expect(await obraComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await obraComponentsPage.deleteObra();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(obraComponentsPage.records, beforeRecordsCount);
      expect(await obraComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(obraComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
