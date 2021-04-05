import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GrupoEmprendimientoUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.grupoEmprendimiento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descripcionInput: ElementFinder = element(by.css('input#grupo-emprendimiento-descripcion'));
  esProtegidoInput: ElementFinder = element(by.css('input#grupo-emprendimiento-esProtegido'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
  }

  getEsProtegidoInput() {
    return this.esProtegidoInput;
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
    const selectedEsProtegido = await this.getEsProtegidoInput().isSelected();
    if (selectedEsProtegido) {
      await this.getEsProtegidoInput().click();
      expect(await this.getEsProtegidoInput().isSelected()).to.be.false;
    } else {
      await this.getEsProtegidoInput().click();
      expect(await this.getEsProtegidoInput().isSelected()).to.be.true;
    }
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
