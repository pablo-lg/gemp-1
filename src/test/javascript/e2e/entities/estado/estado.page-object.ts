import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EstadoUpdatePage from './estado-update.page-object';

const expect = chai.expect;
export class EstadoDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.estado.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-estado'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EstadoComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('estado-heading'));
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
    await navBarPage.getEntityPage('estado');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEstado() {
    await this.createButton.click();
    return new EstadoUpdatePage();
  }

  async deleteEstado() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const estadoDeleteDialog = new EstadoDeleteDialog();
    await waitUntilDisplayed(estadoDeleteDialog.deleteModal);
    expect(await estadoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.estado.delete.question/);
    await estadoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(estadoDeleteDialog.deleteModal);

    expect(await isVisible(estadoDeleteDialog.deleteModal)).to.be.false;
  }
}
