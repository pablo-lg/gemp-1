import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class MasterTipoEmpUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.masterTipoEmp.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descripcionInput: ElementFinder = element(by.css('input#master-tipo-emp-descripcion'));
  sobreLoteInput: ElementFinder = element(by.css('input#master-tipo-emp-sobreLote'));
  sobreViviendaInput: ElementFinder = element(by.css('input#master-tipo-emp-sobreVivienda'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
  }

  async setSobreLoteInput(sobreLote) {
    await this.sobreLoteInput.sendKeys(sobreLote);
  }

  async getSobreLoteInput() {
    return this.sobreLoteInput.getAttribute('value');
  }

  async setSobreViviendaInput(sobreVivienda) {
    await this.sobreViviendaInput.sendKeys(sobreVivienda);
  }

  async getSobreViviendaInput() {
    return this.sobreViviendaInput.getAttribute('value');
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
    await this.setSobreLoteInput('sobreLote');
    expect(await this.getSobreLoteInput()).to.match(/sobreLote/);
    await waitUntilDisplayed(this.saveButton);
    await this.setSobreViviendaInput('sobreVivienda');
    expect(await this.getSobreViviendaInput()).to.match(/sobreVivienda/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
