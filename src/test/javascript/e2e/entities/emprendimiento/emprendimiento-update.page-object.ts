import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class EmprendimientoUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.emprendimiento.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  contactoInput: ElementFinder = element(by.css('input#emprendimiento-contacto'));
  provinciaInput: ElementFinder = element(by.css('input#emprendimiento-provincia'));
  obraSelect: ElementFinder = element(by.css('select#emprendimiento-obra'));
  tipoObraSelect: ElementFinder = element(by.css('select#emprendimiento-tipoObra'));
  tipoEmpSelect: ElementFinder = element(by.css('select#emprendimiento-tipoEmp'));
  estadoSelect: ElementFinder = element(by.css('select#emprendimiento-estado'));
  competenciaSelect: ElementFinder = element(by.css('select#emprendimiento-competencia'));
  despliegueSelect: ElementFinder = element(by.css('select#emprendimiento-despliegue'));
  nSESelect: ElementFinder = element(by.css('select#emprendimiento-nSE'));
  segmentoSelect: ElementFinder = element(by.css('select#emprendimiento-segmento'));
  tecnologiaSelect: ElementFinder = element(by.css('select#emprendimiento-tecnologia'));
  ejecCuentasSelect: ElementFinder = element(by.css('select#emprendimiento-ejecCuentas'));
  direccionSelect: ElementFinder = element(by.css('select#emprendimiento-direccion'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setContactoInput(contacto) {
    await this.contactoInput.sendKeys(contacto);
  }

  async getContactoInput() {
    return this.contactoInput.getAttribute('value');
  }

  async setProvinciaInput(provincia) {
    await this.provinciaInput.sendKeys(provincia);
  }

  async getProvinciaInput() {
    return this.provinciaInput.getAttribute('value');
  }

  async obraSelectLastOption() {
    await this.obraSelect.all(by.tagName('option')).last().click();
  }

  async obraSelectOption(option) {
    await this.obraSelect.sendKeys(option);
  }

  getObraSelect() {
    return this.obraSelect;
  }

  async getObraSelectedOption() {
    return this.obraSelect.element(by.css('option:checked')).getText();
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

  async tipoEmpSelectLastOption() {
    await this.tipoEmpSelect.all(by.tagName('option')).last().click();
  }

  async tipoEmpSelectOption(option) {
    await this.tipoEmpSelect.sendKeys(option);
  }

  getTipoEmpSelect() {
    return this.tipoEmpSelect;
  }

  async getTipoEmpSelectedOption() {
    return this.tipoEmpSelect.element(by.css('option:checked')).getText();
  }

  async estadoSelectLastOption() {
    await this.estadoSelect.all(by.tagName('option')).last().click();
  }

  async estadoSelectOption(option) {
    await this.estadoSelect.sendKeys(option);
  }

  getEstadoSelect() {
    return this.estadoSelect;
  }

  async getEstadoSelectedOption() {
    return this.estadoSelect.element(by.css('option:checked')).getText();
  }

  async competenciaSelectLastOption() {
    await this.competenciaSelect.all(by.tagName('option')).last().click();
  }

  async competenciaSelectOption(option) {
    await this.competenciaSelect.sendKeys(option);
  }

  getCompetenciaSelect() {
    return this.competenciaSelect;
  }

  async getCompetenciaSelectedOption() {
    return this.competenciaSelect.element(by.css('option:checked')).getText();
  }

  async despliegueSelectLastOption() {
    await this.despliegueSelect.all(by.tagName('option')).last().click();
  }

  async despliegueSelectOption(option) {
    await this.despliegueSelect.sendKeys(option);
  }

  getDespliegueSelect() {
    return this.despliegueSelect;
  }

  async getDespliegueSelectedOption() {
    return this.despliegueSelect.element(by.css('option:checked')).getText();
  }

  async nSESelectLastOption() {
    await this.nSESelect.all(by.tagName('option')).last().click();
  }

  async nSESelectOption(option) {
    await this.nSESelect.sendKeys(option);
  }

  getNSESelect() {
    return this.nSESelect;
  }

  async getNSESelectedOption() {
    return this.nSESelect.element(by.css('option:checked')).getText();
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

  async tecnologiaSelectLastOption() {
    await this.tecnologiaSelect.all(by.tagName('option')).last().click();
  }

  async tecnologiaSelectOption(option) {
    await this.tecnologiaSelect.sendKeys(option);
  }

  getTecnologiaSelect() {
    return this.tecnologiaSelect;
  }

  async getTecnologiaSelectedOption() {
    return this.tecnologiaSelect.element(by.css('option:checked')).getText();
  }

  async ejecCuentasSelectLastOption() {
    await this.ejecCuentasSelect.all(by.tagName('option')).last().click();
  }

  async ejecCuentasSelectOption(option) {
    await this.ejecCuentasSelect.sendKeys(option);
  }

  getEjecCuentasSelect() {
    return this.ejecCuentasSelect;
  }

  async getEjecCuentasSelectedOption() {
    return this.ejecCuentasSelect.element(by.css('option:checked')).getText();
  }

  async direccionSelectLastOption() {
    await this.direccionSelect.all(by.tagName('option')).last().click();
  }

  async direccionSelectOption(option) {
    await this.direccionSelect.sendKeys(option);
  }

  getDireccionSelect() {
    return this.direccionSelect;
  }

  async getDireccionSelectedOption() {
    return this.direccionSelect.element(by.css('option:checked')).getText();
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
    await this.setContactoInput('contacto');
    expect(await this.getContactoInput()).to.match(/contacto/);
    await waitUntilDisplayed(this.saveButton);
    await this.setProvinciaInput('provincia');
    expect(await this.getProvinciaInput()).to.match(/provincia/);
    await this.obraSelectLastOption();
    await this.tipoObraSelectLastOption();
    await this.tipoEmpSelectLastOption();
    await this.estadoSelectLastOption();
    await this.competenciaSelectLastOption();
    await this.despliegueSelectLastOption();
    await this.nSESelectLastOption();
    await this.segmentoSelectLastOption();
    await this.tecnologiaSelectLastOption();
    await this.ejecCuentasSelectLastOption();
    await this.direccionSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
