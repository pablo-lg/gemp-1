import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import DespliegueUpdatePage from './despliegue-update.page-object';

const expect = chai.expect;
export class DespliegueDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('gempApp.despliegue.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-despliegue'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class DespliegueComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('despliegue-heading'));
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
    await navBarPage.getEntityPage('despliegue');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateDespliegue() {
    await this.createButton.click();
    return new DespliegueUpdatePage();
  }

  async deleteDespliegue() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const despliegueDeleteDialog = new DespliegueDeleteDialog();
    await waitUntilDisplayed(despliegueDeleteDialog.deleteModal);
    expect(await despliegueDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/gempApp.despliegue.delete.question/);
    await despliegueDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(despliegueDeleteDialog.deleteModal);

    expect(await isVisible(despliegueDeleteDialog.deleteModal)).to.be.false;
  }
}
