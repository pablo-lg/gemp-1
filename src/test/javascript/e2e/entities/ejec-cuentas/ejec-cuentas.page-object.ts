import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EjecCuentasUpdatePage from './ejec-cuentas-update.page-object';

const expect = chai.expect;
export class EjecCuentasDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.ejecCuentas.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-ejecCuentas'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EjecCuentasComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('ejec-cuentas-heading'));
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
    await navBarPage.getEntityPage('ejec-cuentas');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEjecCuentas() {
    await this.createButton.click();
    return new EjecCuentasUpdatePage();
  }

  async deleteEjecCuentas() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const ejecCuentasDeleteDialog = new EjecCuentasDeleteDialog();
    await waitUntilDisplayed(ejecCuentasDeleteDialog.deleteModal);
    expect(await ejecCuentasDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.ejecCuentas.delete.question/);
    await ejecCuentasDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(ejecCuentasDeleteDialog.deleteModal);

    expect(await isVisible(ejecCuentasDeleteDialog.deleteModal)).to.be.false;
  }
}
