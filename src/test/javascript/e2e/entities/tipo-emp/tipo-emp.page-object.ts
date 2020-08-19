import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import TipoEmpUpdatePage from './tipo-emp-update.page-object';

const expect = chai.expect;
export class TipoEmpDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.tipoEmp.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-tipoEmp'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class TipoEmpComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('tipo-emp-heading'));
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
    await navBarPage.getEntityPage('tipo-emp');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateTipoEmp() {
    await this.createButton.click();
    return new TipoEmpUpdatePage();
  }

  async deleteTipoEmp() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const tipoEmpDeleteDialog = new TipoEmpDeleteDialog();
    await waitUntilDisplayed(tipoEmpDeleteDialog.deleteModal);
    expect(await tipoEmpDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.tipoEmp.delete.question/);
    await tipoEmpDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(tipoEmpDeleteDialog.deleteModal);

    expect(await isVisible(tipoEmpDeleteDialog.deleteModal)).to.be.false;
  }
}
