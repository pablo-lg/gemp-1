import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import GrupoUsuarioComponentsPage from './grupo-usuario.page-object';
import GrupoUsuarioUpdatePage from './grupo-usuario-update.page-object';
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

describe('GrupoUsuario e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let grupoUsuarioComponentsPage: GrupoUsuarioComponentsPage;
  let grupoUsuarioUpdatePage: GrupoUsuarioUpdatePage;

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
    grupoUsuarioComponentsPage = new GrupoUsuarioComponentsPage();
    grupoUsuarioComponentsPage = await grupoUsuarioComponentsPage.goToPage(navBarPage);
  });

  it('should load GrupoUsuarios', async () => {
    expect(await grupoUsuarioComponentsPage.title.getText()).to.match(/Grupo Usuarios/);
    expect(await grupoUsuarioComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete GrupoUsuarios', async () => {
    const beforeRecordsCount = (await isVisible(grupoUsuarioComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(grupoUsuarioComponentsPage.table);
    grupoUsuarioUpdatePage = await grupoUsuarioComponentsPage.goToCreateGrupoUsuario();
    await grupoUsuarioUpdatePage.enterData();

    expect(await grupoUsuarioComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(grupoUsuarioComponentsPage.table);
    await waitUntilCount(grupoUsuarioComponentsPage.records, beforeRecordsCount + 1);
    expect(await grupoUsuarioComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await grupoUsuarioComponentsPage.deleteGrupoUsuario();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(grupoUsuarioComponentsPage.records, beforeRecordsCount);
      expect(await grupoUsuarioComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(grupoUsuarioComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
