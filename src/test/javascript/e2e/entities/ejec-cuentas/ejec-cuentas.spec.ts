import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EjecCuentasComponentsPage from './ejec-cuentas.page-object';
import EjecCuentasUpdatePage from './ejec-cuentas-update.page-object';
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

describe('EjecCuentas e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ejecCuentasComponentsPage: EjecCuentasComponentsPage;
  let ejecCuentasUpdatePage: EjecCuentasUpdatePage;

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
    ejecCuentasComponentsPage = new EjecCuentasComponentsPage();
    ejecCuentasComponentsPage = await ejecCuentasComponentsPage.goToPage(navBarPage);
  });

  it('should load EjecCuentas', async () => {
    expect(await ejecCuentasComponentsPage.title.getText()).to.match(/Ejec Cuentas/);
    expect(await ejecCuentasComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete EjecCuentas', async () => {
    const beforeRecordsCount = (await isVisible(ejecCuentasComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(ejecCuentasComponentsPage.table);
    ejecCuentasUpdatePage = await ejecCuentasComponentsPage.goToCreateEjecCuentas();
    await ejecCuentasUpdatePage.enterData();

    expect(await ejecCuentasComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(ejecCuentasComponentsPage.table);
    await waitUntilCount(ejecCuentasComponentsPage.records, beforeRecordsCount + 1);
    expect(await ejecCuentasComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await ejecCuentasComponentsPage.deleteEjecCuentas();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(ejecCuentasComponentsPage.records, beforeRecordsCount);
      expect(await ejecCuentasComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(ejecCuentasComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
