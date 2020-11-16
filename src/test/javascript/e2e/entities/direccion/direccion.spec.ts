import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DireccionComponentsPage from './direccion.page-object';
import DireccionUpdatePage from './direccion-update.page-object';
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

describe('Direccion e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let direccionComponentsPage: DireccionComponentsPage;
  let direccionUpdatePage: DireccionUpdatePage;

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
    direccionComponentsPage = new DireccionComponentsPage();
    direccionComponentsPage = await direccionComponentsPage.goToPage(navBarPage);
  });

  it('should load Direccions', async () => {
    expect(await direccionComponentsPage.title.getText()).to.match(/Direccions/);
    expect(await direccionComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Direccions', async () => {
    const beforeRecordsCount = (await isVisible(direccionComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(direccionComponentsPage.table);
    direccionUpdatePage = await direccionComponentsPage.goToCreateDireccion();
    await direccionUpdatePage.enterData();

    expect(await direccionComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(direccionComponentsPage.table);
    await waitUntilCount(direccionComponentsPage.records, beforeRecordsCount + 1);
    expect(await direccionComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await direccionComponentsPage.deleteDireccion();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(direccionComponentsPage.records, beforeRecordsCount);
      expect(await direccionComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(direccionComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
