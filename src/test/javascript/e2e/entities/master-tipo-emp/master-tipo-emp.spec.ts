import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import MasterTipoEmpComponentsPage from './master-tipo-emp.page-object';
import MasterTipoEmpUpdatePage from './master-tipo-emp-update.page-object';
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

describe('MasterTipoEmp e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let masterTipoEmpComponentsPage: MasterTipoEmpComponentsPage;
  let masterTipoEmpUpdatePage: MasterTipoEmpUpdatePage;
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
    masterTipoEmpComponentsPage = new MasterTipoEmpComponentsPage();
    masterTipoEmpComponentsPage = await masterTipoEmpComponentsPage.goToPage(navBarPage);
  });

  it('should load MasterTipoEmps', async () => {
    expect(await masterTipoEmpComponentsPage.title.getText()).to.match(/Master Tipo Emps/);
    expect(await masterTipoEmpComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete MasterTipoEmps', async () => {
    const beforeRecordsCount = (await isVisible(masterTipoEmpComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(masterTipoEmpComponentsPage.table);
    masterTipoEmpUpdatePage = await masterTipoEmpComponentsPage.goToCreateMasterTipoEmp();
    await masterTipoEmpUpdatePage.enterData();

    expect(await masterTipoEmpComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(masterTipoEmpComponentsPage.table);
    await waitUntilCount(masterTipoEmpComponentsPage.records, beforeRecordsCount + 1);
    expect(await masterTipoEmpComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await masterTipoEmpComponentsPage.deleteMasterTipoEmp();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(masterTipoEmpComponentsPage.records, beforeRecordsCount);
      expect(await masterTipoEmpComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(masterTipoEmpComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
