import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TipoDespUpdatePage from './tipo-desp-update.page-object';

const expect = chai.expect;
export class TipoDespDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.tipoDesp.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoDesp'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TipoDespComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('tipo-desp-heading'));
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
    await navBarPage.getEntityPage('tipo-desp');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTipoDesp() {
    await this.createButton.click();
    return new TipoDespUpdatePage();
  }

  async deleteTipoDesp() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const tipoDespDeleteDialog = new TipoDespDeleteDialog();
    await waitUntilDisplayed(tipoDespDeleteDialog.deleteModal);
    expect(await tipoDespDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.tipoDesp.delete.question/);
    await tipoDespDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tipoDespDeleteDialog.deleteModal);

    expect(await isVisible(tipoDespDeleteDialog.deleteModal)).to.be.false;
  }
}
