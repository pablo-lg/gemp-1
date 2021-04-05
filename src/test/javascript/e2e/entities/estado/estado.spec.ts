import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EstadoComponentsPage from './estado.page-object';
import EstadoUpdatePage from './estado-update.page-object';
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

describe('Estado e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let estadoComponentsPage: EstadoComponentsPage;
  let estadoUpdatePage: EstadoUpdatePage;
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
    estadoComponentsPage = new EstadoComponentsPage();
    estadoComponentsPage = await estadoComponentsPage.goToPage(navBarPage);
  });

  it('should load Estados', async () => {
    expect(await estadoComponentsPage.title.getText()).to.match(/Estados/);
    expect(await estadoComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Estados', async () => {
    const beforeRecordsCount = (await isVisible(estadoComponentsPage.noRecords)) ? 0 : await getRecordsCount(estadoComponentsPage.table);
    estadoUpdatePage = await estadoComponentsPage.goToCreateEstado();
    await estadoUpdatePage.enterData();

    expect(await estadoComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(estadoComponentsPage.table);
    await waitUntilCount(estadoComponentsPage.records, beforeRecordsCount + 1);
    expect(await estadoComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await estadoComponentsPage.deleteEstado();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(estadoComponentsPage.records, beforeRecordsCount);
      expect(await estadoComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(estadoComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
