import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class ObraUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.obra.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descripcionInput: ElementFinder = element(by.css('input#obra-descripcion'));
  habilitadaInput: ElementFinder = element(by.css('input#obra-habilitada'));
  fechaFinObraInput: ElementFinder = element(by.css('input#obra-fechaFinObra'));
  tipoObraSelect: ElementFinder = element(by.css('select#obra-tipoObra'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescripcionInput(descripcion) {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput() {
    return this.descripcionInput.getAttribute('value');
  }

  getHabilitadaInput() {
    return this.habilitadaInput;
  }
  async setFechaFinObraInput(fechaFinObra) {
    await this.fechaFinObraInput.sendKeys(fechaFinObra);
  }

  async getFechaFinObraInput() {
    return this.fechaFinObraInput.getAttribute('value');
  }

  async tipoObraSelectLastOption() {
    await this.tipoObraSelect.all(by.tagName('option')).last().click();
  }

  async tipoObraSelectOption(option) {
    await this.tipoObraSelect.sendKeys(option);
  }

  getTipoObraSelect() {
    return this.tipoObraSelect;
  }

  async getTipoObraSelectedOption() {
    return this.tipoObraSelect.element(by.css('option:checked')).getText();
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
    const selectedHabilitada = await this.getHabilitadaInput().isSelected();
    if (selectedHabilitada) {
      await this.getHabilitadaInput().click();
      expect(await this.getHabilitadaInput().isSelected()).to.be.false;
    } else {
      await this.getHabilitadaInput().click();
      expect(await this.getHabilitadaInput().isSelected()).to.be.true;
    }
    await waitUntilDisplayed(this.saveButton);
    await this.setFechaFinObraInput('01-01-2001');
    expect(await this.getFechaFinObraInput()).to.eq('2001-01-01');
    await this.tipoObraSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
