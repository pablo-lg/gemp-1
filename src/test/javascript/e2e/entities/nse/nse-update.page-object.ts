import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class NSEUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.nSE.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descripcionInput: ElementFinder = element(by.css('input#nse-descripcion'));
  activoInput: ElementFinder = element(by.css('input#nse-activo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
  }

  getActivoInput() {
    return this.activoInput;
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.setDescripcionInput('descripcion');
    expect(await this.getDescripcionInput()).to.match(/descripcion/);
    await waitUntilDisplayed(this.saveButton);
    const selectedActivo = await this.getActivoInput().isSelected();
    if (selectedActivo) {
      await this.getActivoInput().click();
      expect(await this.getActivoInput().isSelected()).to.be.false;
    } else {
      await this.getActivoInput().click();
      expect(await this.getActivoInput().isSelected()).to.be.true;
    }
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
