import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class TipoEmpUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.tipoEmp.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descripcionInput: ElementFinder = element(by.css('input#tipo-emp-descripcion'));
  valorInput: ElementFinder = element(by.css('input#tipo-emp-valor'));
  masterTipoEmpSelect: ElementFinder = element(by.css('select#tipo-emp-masterTipoEmp'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
  }

  async setValorInput(valor) {
    await this.valorInput.sendKeys(valor);
  }

  async getValorInput() {
    return this.valorInput.getAttribute('value');
  }

  async masterTipoEmpSelectLastOption() {
    await this.masterTipoEmpSelect.all(by.tagName('option')).last().click();
  }

  async masterTipoEmpSelectOption(option) {
    await this.masterTipoEmpSelect.sendKeys(option);
  }

  getMasterTipoEmpSelect() {
    return this.masterTipoEmpSelect;
  }

  async getMasterTipoEmpSelectedOption() {
    return this.masterTipoEmpSelect.element(by.css('option:checked')).getText();
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
    await this.setValorInput('valor');
    expect(await this.getValorInput()).to.match(/valor/);
    await this.masterTipoEmpSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
