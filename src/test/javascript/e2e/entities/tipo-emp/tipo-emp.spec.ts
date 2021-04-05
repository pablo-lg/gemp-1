import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TipoEmpComponentsPage from './tipo-emp.page-object';
import TipoEmpUpdatePage from './tipo-emp-update.page-object';
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

describe('TipoEmp e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tipoEmpComponentsPage: TipoEmpComponentsPage;
  let tipoEmpUpdatePage: TipoEmpUpdatePage;
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
    tipoEmpComponentsPage = new TipoEmpComponentsPage();
    tipoEmpComponentsPage = await tipoEmpComponentsPage.goToPage(navBarPage);
  });

  it('should load TipoEmps', async () => {
    expect(await tipoEmpComponentsPage.title.getText()).to.match(/Tipo Emps/);
    expect(await tipoEmpComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete TipoEmps', async () => {
    const beforeRecordsCount = (await isVisible(tipoEmpComponentsPage.noRecords)) ? 0 : await getRecordsCount(tipoEmpComponentsPage.table);
    tipoEmpUpdatePage = await tipoEmpComponentsPage.goToCreateTipoEmp();
    await tipoEmpUpdatePage.enterData();

    expect(await tipoEmpComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(tipoEmpComponentsPage.table);
    await waitUntilCount(tipoEmpComponentsPage.records, beforeRecordsCount + 1);
    expect(await tipoEmpComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await tipoEmpComponentsPage.deleteTipoEmp();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(tipoEmpComponentsPage.records, beforeRecordsCount);
      expect(await tipoEmpComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(tipoEmpComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
