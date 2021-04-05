import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GrupoEmprendimientoComponentsPage from './grupo-emprendimiento.page-object';
import GrupoEmprendimientoUpdatePage from './grupo-emprendimiento-update.page-object';
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

describe('GrupoEmprendimiento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let grupoEmprendimientoComponentsPage: GrupoEmprendimientoComponentsPage;
  let grupoEmprendimientoUpdatePage: GrupoEmprendimientoUpdatePage;
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
    grupoEmprendimientoComponentsPage = new GrupoEmprendimientoComponentsPage();
    grupoEmprendimientoComponentsPage = await grupoEmprendimientoComponentsPage.goToPage(navBarPage);
  });

  it('should load GrupoEmprendimientos', async () => {
    expect(await grupoEmprendimientoComponentsPage.title.getText()).to.match(/Grupo Emprendimientos/);
    expect(await grupoEmprendimientoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete GrupoEmprendimientos', async () => {
    const beforeRecordsCount = (await isVisible(grupoEmprendimientoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(grupoEmprendimientoComponentsPage.table);
    grupoEmprendimientoUpdatePage = await grupoEmprendimientoComponentsPage.goToCreateGrupoEmprendimiento();
    await grupoEmprendimientoUpdatePage.enterData();

    expect(await grupoEmprendimientoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(grupoEmprendimientoComponentsPage.table);
    await waitUntilCount(grupoEmprendimientoComponentsPage.records, beforeRecordsCount + 1);
    expect(await grupoEmprendimientoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await grupoEmprendimientoComponentsPage.deleteGrupoEmprendimiento();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(grupoEmprendimientoComponentsPage.records, beforeRecordsCount);
      expect(await grupoEmprendimientoComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(grupoEmprendimientoComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
