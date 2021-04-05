import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TecnologiaComponentsPage from './tecnologia.page-object';
import TecnologiaUpdatePage from './tecnologia-update.page-object';
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

describe('Tecnologia e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tecnologiaComponentsPage: TecnologiaComponentsPage;
  let tecnologiaUpdatePage: TecnologiaUpdatePage;
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
    tecnologiaComponentsPage = new TecnologiaComponentsPage();
    tecnologiaComponentsPage = await tecnologiaComponentsPage.goToPage(navBarPage);
  });

  it('should load Tecnologias', async () => {
    expect(await tecnologiaComponentsPage.title.getText()).to.match(/Tecnologias/);
    expect(await tecnologiaComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Tecnologias', async () => {
    const beforeRecordsCount = (await isVisible(tecnologiaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tecnologiaComponentsPage.table);
    tecnologiaUpdatePage = await tecnologiaComponentsPage.goToCreateTecnologia();
    await tecnologiaUpdatePage.enterData();

    expect(await tecnologiaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(tecnologiaComponentsPage.table);
    await waitUntilCount(tecnologiaComponentsPage.records, beforeRecordsCount + 1);
    expect(await tecnologiaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await tecnologiaComponentsPage.deleteTecnologia();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(tecnologiaComponentsPage.records, beforeRecordsCount);
      expect(await tecnologiaComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(tecnologiaComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
