import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EjecCuentasUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.ejecCuentas.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  telefonoInput: ElementFinder = element(by.css('input#ejec-cuentas-telefono'));
  apellidoInput: ElementFinder = element(by.css('input#ejec-cuentas-apellido'));
  celularInput: ElementFinder = element(by.css('input#ejec-cuentas-celular'));
  mailInput: ElementFinder = element(by.css('input#ejec-cuentas-mail'));
  nombreInput: ElementFinder = element(by.css('input#ejec-cuentas-nombre'));
  repcom1Input: ElementFinder = element(by.css('input#ejec-cuentas-repcom1'));
  repcom2Input: ElementFinder = element(by.css('input#ejec-cuentas-repcom2'));
  segmentoSelect: ElementFinder = element(by.css('select#ejec-cuentas-segmento'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTelefonoInput(telefono) {
    await this.telefonoInput.sendKeys(telefono);
  }

  async getTelefonoInput() {
    return this.telefonoInput.getAttribute('value');
  }

  async setApellidoInput(apellido) {
    await this.apellidoInput.sendKeys(apellido);
  }

  async getApellidoInput() {
    return this.apellidoInput.getAttribute('value');
  }

  async setCelularInput(celular) {
    await this.celularInput.sendKeys(celular);
  }

  async getCelularInput() {
    return this.celularInput.getAttribute('value');
  }

  async setMailInput(mail) {
    await this.mailInput.sendKeys(mail);
  }

  async getMailInput() {
    return this.mailInput.getAttribute('value');
  }

  async setNombreInput(nombre) {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput() {
    return this.nombreInput.getAttribute('value');
  }

  async setRepcom1Input(repcom1) {
    await this.repcom1Input.sendKeys(repcom1);
  }

  async getRepcom1Input() {
    return this.repcom1Input.getAttribute('value');
  }

  async setRepcom2Input(repcom2) {
    await this.repcom2Input.sendKeys(repcom2);
  }

  async getRepcom2Input() {
    return this.repcom2Input.getAttribute('value');
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
    await this.setTelefonoInput('telefono');
    expect(await this.getTelefonoInput()).to.match(/telefono/);
    await waitUntilDisplayed(this.saveButton);
    await this.setApellidoInput('apellido');
    expect(await this.getApellidoInput()).to.match(/apellido/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCelularInput('celular');
    expect(await this.getCelularInput()).to.match(/celular/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMailInput('mail');
    expect(await this.getMailInput()).to.match(/mail/);
    await waitUntilDisplayed(this.saveButton);
    await this.setNombreInput('nombre');
    expect(await this.getNombreInput()).to.match(/nombre/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRepcom1Input('repcom1');
    expect(await this.getRepcom1Input()).to.match(/repcom1/);
    await waitUntilDisplayed(this.saveButton);
    await this.setRepcom2Input('repcom2');
    expect(await this.getRepcom2Input()).to.match(/repcom2/);
    await this.segmentoSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
