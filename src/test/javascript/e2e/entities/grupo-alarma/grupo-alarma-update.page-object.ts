import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GrupoAlarmaUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.grupoAlarma.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nombreGrupoInput: ElementFinder = element(by.css('input#grupo-alarma-nombreGrupo'));
  alarmaTiempoInput: ElementFinder = element(by.css('input#grupo-alarma-alarmaTiempo'));
  alarmaSvaInput: ElementFinder = element(by.css('input#grupo-alarma-alarmaSva'));
  alarmaBusinesscaseInput: ElementFinder = element(by.css('input#grupo-alarma-alarmaBusinesscase'));
  grupoEmprendimientoSelect: ElementFinder = element(by.css('select#grupo-alarma-grupoEmprendimiento'));
  grupoUsuarioSelect: ElementFinder = element(by.css('select#grupo-alarma-grupoUsuario'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNombreGrupoInput(nombreGrupo) {
    await this.nombreGrupoInput.sendKeys(nombreGrupo);
  }

  async getNombreGrupoInput() {
    return this.nombreGrupoInput.getAttribute('value');
  }

  async setAlarmaTiempoInput(alarmaTiempo) {
    await this.alarmaTiempoInput.sendKeys(alarmaTiempo);
  }

  async getAlarmaTiempoInput() {
    return this.alarmaTiempoInput.getAttribute('value');
  }

  async setAlarmaSvaInput(alarmaSva) {
    await this.alarmaSvaInput.sendKeys(alarmaSva);
  }

  async getAlarmaSvaInput() {
    return this.alarmaSvaInput.getAttribute('value');
  }

  async setAlarmaBusinesscaseInput(alarmaBusinesscase) {
    await this.alarmaBusinesscaseInput.sendKeys(alarmaBusinesscase);
  }

  async getAlarmaBusinesscaseInput() {
    return this.alarmaBusinesscaseInput.getAttribute('value');
  }

  async grupoEmprendimientoSelectLastOption() {
    await this.grupoEmprendimientoSelect.all(by.tagName('option')).last().click();
  }

  async grupoEmprendimientoSelectOption(option) {
    await this.grupoEmprendimientoSelect.sendKeys(option);
  }

  getGrupoEmprendimientoSelect() {
    return this.grupoEmprendimientoSelect;
  }

  async getGrupoEmprendimientoSelectedOption() {
    return this.grupoEmprendimientoSelect.element(by.css('option:checked')).getText();
  }

  async grupoUsuarioSelectLastOption() {
    await this.grupoUsuarioSelect.all(by.tagName('option')).last().click();
  }

  async grupoUsuarioSelectOption(option) {
    await this.grupoUsuarioSelect.sendKeys(option);
  }

  getGrupoUsuarioSelect() {
    return this.grupoUsuarioSelect;
  }

  async getGrupoUsuarioSelectedOption() {
    return this.grupoUsuarioSelect.element(by.css('option:checked')).getText();
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
    await this.setNombreGrupoInput('nombreGrupo');
    expect(await this.getNombreGrupoInput()).to.match(/nombreGrupo/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAlarmaTiempoInput('5');
    expect(await this.getAlarmaTiempoInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setAlarmaSvaInput('5');
    expect(await this.getAlarmaSvaInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setAlarmaBusinesscaseInput('5');
    expect(await this.getAlarmaBusinesscaseInput()).to.eq('5');
    await this.grupoEmprendimientoSelectLastOption();
    await this.grupoUsuarioSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
