import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DespliegueComponentsPage from './despliegue.page-object';
import DespliegueUpdatePage from './despliegue-update.page-object';
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

describe('Despliegue e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let despliegueComponentsPage: DespliegueComponentsPage;
  let despliegueUpdatePage: DespliegueUpdatePage;
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
    despliegueComponentsPage = new DespliegueComponentsPage();
    despliegueComponentsPage = await despliegueComponentsPage.goToPage(navBarPage);
  });

  it('should load Despliegues', async () => {
    expect(await despliegueComponentsPage.title.getText()).to.match(/Despliegues/);
    expect(await despliegueComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Despliegues', async () => {
    const beforeRecordsCount = (await isVisible(despliegueComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(despliegueComponentsPage.table);
    despliegueUpdatePage = await despliegueComponentsPage.goToCreateDespliegue();
    await despliegueUpdatePage.enterData();

    expect(await despliegueComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(despliegueComponentsPage.table);
    await waitUntilCount(despliegueComponentsPage.records, beforeRecordsCount + 1);
    expect(await despliegueComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await despliegueComponentsPage.deleteDespliegue();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(despliegueComponentsPage.records, beforeRecordsCount);
      expect(await despliegueComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(despliegueComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
