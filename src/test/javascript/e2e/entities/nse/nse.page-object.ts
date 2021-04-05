import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import NSEUpdatePage from './nse-update.page-object';

const expect = chai.expect;
export class NSEDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.nSE.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-nSE'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class NSEComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('nse-heading'));
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
    await navBarPage.getEntityPage('nse');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateNSE() {
    await this.createButton.click();
    return new NSEUpdatePage();
  }

  async deleteNSE() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const nSEDeleteDialog = new NSEDeleteDialog();
    await waitUntilDisplayed(nSEDeleteDialog.deleteModal);
    expect(await nSEDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.nSE.delete.question/);
    await nSEDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(nSEDeleteDialog.deleteModal);

    expect(await isVisible(nSEDeleteDialog.deleteModal)).to.be.false;
  }
}
