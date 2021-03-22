import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import PautaComponentsPage from './pauta.page-object';
import PautaUpdatePage from './pauta-update.page-object';
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

describe('Pauta e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pautaComponentsPage: PautaComponentsPage;
  let pautaUpdatePage: PautaUpdatePage;

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
    pautaComponentsPage = new PautaComponentsPage();
    pautaComponentsPage = await pautaComponentsPage.goToPage(navBarPage);
  });

  it('should load Pautas', async () => {
    expect(await pautaComponentsPage.title.getText()).to.match(/Pautas/);
    expect(await pautaComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Pautas', async () => {
    const beforeRecordsCount = (await isVisible(pautaComponentsPage.noRecords)) ? 0 : await getRecordsCount(pautaComponentsPage.table);
    pautaUpdatePage = await pautaComponentsPage.goToCreatePauta();
    await pautaUpdatePage.enterData();

    expect(await pautaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(pautaComponentsPage.table);
    await waitUntilCount(pautaComponentsPage.records, beforeRecordsCount + 1);
    expect(await pautaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await pautaComponentsPage.deletePauta();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(pautaComponentsPage.records, beforeRecordsCount);
      expect(await pautaComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(pautaComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
