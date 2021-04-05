import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CompetenciaComponentsPage from './competencia.page-object';
import CompetenciaUpdatePage from './competencia-update.page-object';
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

describe('Competencia e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let competenciaComponentsPage: CompetenciaComponentsPage;
  let competenciaUpdatePage: CompetenciaUpdatePage;
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
    competenciaComponentsPage = new CompetenciaComponentsPage();
    competenciaComponentsPage = await competenciaComponentsPage.goToPage(navBarPage);
  });

  it('should load Competencias', async () => {
    expect(await competenciaComponentsPage.title.getText()).to.match(/Competencias/);
    expect(await competenciaComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Competencias', async () => {
    const beforeRecordsCount = (await isVisible(competenciaComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(competenciaComponentsPage.table);
    competenciaUpdatePage = await competenciaComponentsPage.goToCreateCompetencia();
    await competenciaUpdatePage.enterData();

    expect(await competenciaComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(competenciaComponentsPage.table);
    await waitUntilCount(competenciaComponentsPage.records, beforeRecordsCount + 1);
    expect(await competenciaComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await competenciaComponentsPage.deleteCompetencia();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(competenciaComponentsPage.records, beforeRecordsCount);
      expect(await competenciaComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(competenciaComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
