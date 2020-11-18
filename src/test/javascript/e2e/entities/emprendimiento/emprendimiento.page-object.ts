import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import EmprendimientoUpdatePage from './emprendimiento-update.page-object';

const expect = chai.expect;
export class EmprendimientoDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.emprendimiento.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-emprendimiento'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class EmprendimientoComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('emprendimiento-heading'));
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
    await navBarPage.getEntityPage('emprendimiento');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateEmprendimiento() {
    await this.createButton.click();
    return new EmprendimientoUpdatePage();
  }

  async deleteEmprendimiento() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const emprendimientoDeleteDialog = new EmprendimientoDeleteDialog();
    await waitUntilDisplayed(emprendimientoDeleteDialog.deleteModal);
    expect(await emprendimientoDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.emprendimiento.delete.question/);
    await emprendimientoDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(emprendimientoDeleteDialog.deleteModal);

    expect(await isVisible(emprendimientoDeleteDialog.deleteModal)).to.be.false;
  }
}
