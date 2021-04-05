import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmprendimientoComponentsPage from './emprendimiento.page-object';
import EmprendimientoUpdatePage from './emprendimiento-update.page-object';
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

describe('Emprendimiento e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let emprendimientoComponentsPage: EmprendimientoComponentsPage;
  let emprendimientoUpdatePage: EmprendimientoUpdatePage;
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
    emprendimientoComponentsPage = new EmprendimientoComponentsPage();
    emprendimientoComponentsPage = await emprendimientoComponentsPage.goToPage(navBarPage);
  });

  it('should load Emprendimientos', async () => {
    expect(await emprendimientoComponentsPage.title.getText()).to.match(/Emprendimientos/);
    expect(await emprendimientoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Emprendimientos', async () => {
    const beforeRecordsCount = (await isVisible(emprendimientoComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(emprendimientoComponentsPage.table);
    emprendimientoUpdatePage = await emprendimientoComponentsPage.goToCreateEmprendimiento();
    await emprendimientoUpdatePage.enterData();

    expect(await emprendimientoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(emprendimientoComponentsPage.table);
    await waitUntilCount(emprendimientoComponentsPage.records, beforeRecordsCount + 1);
    expect(await emprendimientoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await emprendimientoComponentsPage.deleteEmprendimiento();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(emprendimientoComponentsPage.records, beforeRecordsCount);
      expect(await emprendimientoComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(emprendimientoComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
