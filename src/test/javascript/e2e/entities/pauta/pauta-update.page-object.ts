import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class PautaUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.pauta.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  aniosInput: ElementFinder = element(by.css('input#pauta-anios'));
  tipoPautaInput: ElementFinder = element(by.css('input#pauta-tipoPauta'));
  masterTipoEmpSelect: ElementFinder = element(by.css('select#pauta-masterTipoEmp'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAniosInput(anios) {
    await this.aniosInput.sendKeys(anios);
  }

  async getAniosInput() {
    return this.aniosInput.getAttribute('value');
  }

  async setTipoPautaInput(tipoPauta) {
    await this.tipoPautaInput.sendKeys(tipoPauta);
  }

  async getTipoPautaInput() {
    return this.tipoPautaInput.getAttribute('value');
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
    await this.setAniosInput('5');
    expect(await this.getAniosInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setTipoPautaInput('tipoPauta');
    expect(await this.getTipoPautaInput()).to.match(/tipoPauta/);
    await this.masterTipoEmpSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
