import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GrupoAlarmaComponentsPage from './grupo-alarma.page-object';
import GrupoAlarmaUpdatePage from './grupo-alarma-update.page-object';
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

describe('GrupoAlarma e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let grupoAlarmaComponentsPage: GrupoAlarmaComponentsPage;
  let grupoAlarmaUpdatePage: GrupoAlarmaUpdatePage;

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
    grupoAlarmaComponentsPage = new GrupoAlarmaComponentsPage();
    grupoAlarmaComponentsPage = await grupoAlarmaComponentsPage.goToPage(navBarPage);
  });

  it('should load GrupoAlarmas', async () => {
    expect(await grupoAlarmaComponentsPage.title.getText()).to.match(/Grupo Alarmas/);
    expect(await grupoAlarmaComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete GrupoAlarmas', async () => {
    const beforeRecordsCount = (await isVisible(grupoAlarmaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(grupoAlarmaComponentsPage.table);
    grupoAlarmaUpdatePage = await grupoAlarmaComponentsPage.goToCreateGrupoAlarma();
    await grupoAlarmaUpdatePage.enterData();

    expect(await grupoAlarmaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(grupoAlarmaComponentsPage.table);
    await waitUntilCount(grupoAlarmaComponentsPage.records, beforeRecordsCount + 1);
    expect(await grupoAlarmaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await grupoAlarmaComponentsPage.deleteGrupoAlarma();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(grupoAlarmaComponentsPage.records, beforeRecordsCount);
      expect(await grupoAlarmaComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(grupoAlarmaComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
