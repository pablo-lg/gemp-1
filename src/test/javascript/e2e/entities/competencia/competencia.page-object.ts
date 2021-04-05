import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import CompetenciaUpdatePage from './competencia-update.page-object';

const expect = chai.expect;
export class CompetenciaDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.competencia.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-competencia'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class CompetenciaComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('competencia-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('competencia');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateCompetencia() {
    await this.createButton.click();
    return new CompetenciaUpdatePage();
  }

  async deleteCompetencia() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const competenciaDeleteDialog = new CompetenciaDeleteDialog();
    await waitUntilDisplayed(competenciaDeleteDialog.deleteModal);
    expect(await competenciaDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.competencia.delete.question/);
    await competenciaDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(competenciaDeleteDialog.deleteModal);

    expect(await isVisible(competenciaDeleteDialog.deleteModal)).to.be.false;
  }
}
