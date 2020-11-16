import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DireccionUpdatePage from './direccion-update.page-object';

const expect = chai.expect;
export class DireccionDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.direccion.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-direccion'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DireccionComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('direccion-heading'));
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
    await navBarPage.getEntityPage('direccion');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDireccion() {
    await this.createButton.click();
    return new DireccionUpdatePage();
  }

  async deleteDireccion() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const direccionDeleteDialog = new DireccionDeleteDialog();
    await waitUntilDisplayed(direccionDeleteDialog.deleteModal);
    expect(await direccionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.direccion.delete.question/);
    await direccionDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(direccionDeleteDialog.deleteModal);

    expect(await isVisible(direccionDeleteDialog.deleteModal)).to.be.false;
  }
}
