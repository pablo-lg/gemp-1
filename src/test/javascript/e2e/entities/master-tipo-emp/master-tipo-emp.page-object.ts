import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import MasterTipoEmpUpdatePage from './master-tipo-emp-update.page-object';

const expect = chai.expect;
export class MasterTipoEmpDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.masterTipoEmp.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-masterTipoEmp'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class MasterTipoEmpComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('master-tipo-emp-heading'));
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
    await navBarPage.getEntityPage('master-tipo-emp');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateMasterTipoEmp() {
    await this.createButton.click();
    return new MasterTipoEmpUpdatePage();
  }

  async deleteMasterTipoEmp() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const masterTipoEmpDeleteDialog = new MasterTipoEmpDeleteDialog();
    await waitUntilDisplayed(masterTipoEmpDeleteDialog.deleteModal);
    expect(await masterTipoEmpDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.masterTipoEmp.delete.question/);
    await masterTipoEmpDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(masterTipoEmpDeleteDialog.deleteModal);

    expect(await isVisible(masterTipoEmpDeleteDialog.deleteModal)).to.be.false;
  }
}
