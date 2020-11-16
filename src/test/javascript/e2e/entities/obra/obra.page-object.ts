import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import ObraUpdatePage from './obra-update.page-object';

const expect = chai.expect;
export class ObraDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.obra.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-obra'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class ObraComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('obra-heading'));
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
    await navBarPage.getEntityPage('obra');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateObra() {
    await this.createButton.click();
    return new ObraUpdatePage();
  }

  async deleteObra() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const obraDeleteDialog = new ObraDeleteDialog();
    await waitUntilDisplayed(obraDeleteDialog.deleteModal);
    expect(await obraDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.obra.delete.question/);
    await obraDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(obraDeleteDialog.deleteModal);

    expect(await isVisible(obraDeleteDialog.deleteModal)).to.be.false;
  }
}
