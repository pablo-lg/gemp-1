import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TipoObraUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.tipoObra.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descripcionInput: ElementFinder = element(by.css('input#tipo-obra-descripcion'));
  segmentoSelect: ElementFinder = element(by.css('select#tipo-obra-segmento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
  }

  async segmentoSelectLastOption() {
    await this.segmentoSelect.all(by.tagName('option')).last().click();
  }

  async segmentoSelectOption(option) {
    await this.segmentoSelect.sendKeys(option);
  }

  getSegmentoSelect() {
    return this.segmentoSelect;
  }

  async getSegmentoSelectedOption() {
    return this.segmentoSelect.element(by.css('option:checked')).getText();
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
    await this.segmentoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
