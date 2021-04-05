import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TipoObraComponentsPage from './tipo-obra.page-object';
import TipoObraUpdatePage from './tipo-obra-update.page-object';
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

describe('TipoObra e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoObraComponentsPage: TipoObraComponentsPage;
  let tipoObraUpdatePage: TipoObraUpdatePage;
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
    tipoObraComponentsPage = new TipoObraComponentsPage();
    tipoObraComponentsPage = await tipoObraComponentsPage.goToPage(navBarPage);
  });

  it('should load TipoObras', async () => {
    expect(await tipoObraComponentsPage.title.getText()).to.match(/Tipo Obras/);
    expect(await tipoObraComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TipoObras', async () => {
    const beforeRecordsCount = (await isVisible(tipoObraComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(tipoObraComponentsPage.table);
    tipoObraUpdatePage = await tipoObraComponentsPage.goToCreateTipoObra();
    await tipoObraUpdatePage.enterData();

    expect(await tipoObraComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(tipoObraComponentsPage.table);
    await waitUntilCount(tipoObraComponentsPage.records, beforeRecordsCount + 1);
    expect(await tipoObraComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await tipoObraComponentsPage.deleteTipoObra();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(tipoObraComponentsPage.records, beforeRecordsCount);
      expect(await tipoObraComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(tipoObraComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
