import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TipoDespComponentsPage from './tipo-desp.page-object';
import TipoDespUpdatePage from './tipo-desp-update.page-object';
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

describe('TipoDesp e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoDespComponentsPage: TipoDespComponentsPage;
  let tipoDespUpdatePage: TipoDespUpdatePage;
  const username = process.env.E2E_USERNAME ?? 'admin';
  const password = process.env.E2E_PASSWORD ?? 'admin';

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();
    await signInPage.username.sendKeys(username);
    await signInPage.password.sendKeys(password);
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    tipoDespComponentsPage = new TipoDespComponentsPage();
    tipoDespComponentsPage = await tipoDespComponentsPage.goToPage(navBarPage);
  });

  it('should load TipoDesps', async () => {
    expect(await tipoDespComponentsPage.title.getText()).to.match(/Tipo Desps/);
    expect(await tipoDespComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TipoDesps', async () => {
    const beforeRecordsCount = (await isVisible(tipoDespComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tipoDespComponentsPage.table);
    tipoDespUpdatePage = await tipoDespComponentsPage.goToCreateTipoDesp();
    await tipoDespUpdatePage.enterData();

    expect(await tipoDespComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(tipoDespComponentsPage.table);
    await waitUntilCount(tipoDespComponentsPage.records, beforeRecordsCount + 1);
    expect(await tipoDespComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await tipoDespComponentsPage.deleteTipoDesp();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(tipoDespComponentsPage.records, beforeRecordsCount);
      expect(await tipoDespComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(tipoDespComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
