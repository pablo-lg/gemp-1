import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class DireccionUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.direccion.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  paisInput: ElementFinder = element(by.css('input#direccion-pais'));
  provinciaInput: ElementFinder = element(by.css('input#direccion-provincia'));
  partidoInput: ElementFinder = element(by.css('input#direccion-partido'));
  localidadInput: ElementFinder = element(by.css('input#direccion-localidad'));
  calleInput: ElementFinder = element(by.css('input#direccion-calle'));
  alturaInput: ElementFinder = element(by.css('input#direccion-altura'));
  regionInput: ElementFinder = element(by.css('input#direccion-region'));
  subregionInput: ElementFinder = element(by.css('input#direccion-subregion'));
  hubInput: ElementFinder = element(by.css('input#direccion-hub'));
  barriosEspecialesInput: ElementFinder = element(by.css('input#direccion-barriosEspeciales'));
  codigoPostalInput: ElementFinder = element(by.css('input#direccion-codigoPostal'));
  tipoCalleInput: ElementFinder = element(by.css('input#direccion-tipoCalle'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setPaisInput(pais) {
    await this.paisInput.sendKeys(pais);
  }

  async getPaisInput() {
    return this.paisInput.getAttribute('value');
  }

  async setProvinciaInput(provincia) {
    await this.provinciaInput.sendKeys(provincia);
  }

  async getProvinciaInput() {
    return this.provinciaInput.getAttribute('value');
  }

  async setPartidoInput(partido) {
    await this.partidoInput.sendKeys(partido);
  }

  async getPartidoInput() {
    return this.partidoInput.getAttribute('value');
  }

  async setLocalidadInput(localidad) {
    await this.localidadInput.sendKeys(localidad);
  }

  async getLocalidadInput() {
    return this.localidadInput.getAttribute('value');
  }

  async setCalleInput(calle) {
    await this.calleInput.sendKeys(calle);
  }

  async getCalleInput() {
    return this.calleInput.getAttribute('value');
  }

  async setAlturaInput(altura) {
    await this.alturaInput.sendKeys(altura);
  }

  async getAlturaInput() {
    return this.alturaInput.getAttribute('value');
  }

  async setRegionInput(region) {
    await this.regionInput.sendKeys(region);
  }

  async getRegionInput() {
    return this.regionInput.getAttribute('value');
  }

  async setSubregionInput(subregion) {
    await this.subregionInput.sendKeys(subregion);
  }

  async getSubregionInput() {
    return this.subregionInput.getAttribute('value');
  }

  async setHubInput(hub) {
    await this.hubInput.sendKeys(hub);
  }

  async getHubInput() {
    return this.hubInput.getAttribute('value');
  }

  async setBarriosEspecialesInput(barriosEspeciales) {
    await this.barriosEspecialesInput.sendKeys(barriosEspeciales);
  }

  async getBarriosEspecialesInput() {
    return this.barriosEspecialesInput.getAttribute('value');
  }

  async setCodigoPostalInput(codigoPostal) {
    await this.codigoPostalInput.sendKeys(codigoPostal);
  }

  async getCodigoPostalInput() {
    return this.codigoPostalInput.getAttribute('value');
  }

  async setTipoCalleInput(tipoCalle) {
    await this.tipoCalleInput.sendKeys(tipoCalle);
  }

  async getTipoCalleInput() {
    return this.tipoCalleInput.getAttribute('value');
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
    await this.setPaisInput('pais');
    expect(await this.getPaisInput()).to.match(/pais/);
    await waitUntilDisplayed(this.saveButton);
    await this.setProvinciaInput('provincia');
    expect(await this.getProvinciaInput()).to.match(/provincia/);
    await waitUntilDisplayed(this.saveButton);
    await this.setPartidoInput('partido');
    expect(await this.getPartidoInput()).to.match(/partido/);
    await waitUntilDisplayed(this.saveButton);
    await this.setLocalidadInput('localidad');
    expect(await this.getLocalidadInput()).to.match(/localidad/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCalleInput('calle');
    expect(await this.getCalleInput()).to.match(/calle/);
    await waitUntilDisplayed(this.saveButton);
    await this.setAlturaInput('5');
    expect(await this.getAlturaInput()).to.eq('5');
    await waitUntilDisplayed(this.saveButton);
    await this.setRegionInput('region');
    expect(await this.getRegionInput()).to.match(/region/);
    await waitUntilDisplayed(this.saveButton);
    await this.setSubregionInput('subregion');
    expect(await this.getSubregionInput()).to.match(/subregion/);
    await waitUntilDisplayed(this.saveButton);
    await this.setHubInput('hub');
    expect(await this.getHubInput()).to.match(/hub/);
    await waitUntilDisplayed(this.saveButton);
    await this.setBarriosEspecialesInput('barriosEspeciales');
    expect(await this.getBarriosEspecialesInput()).to.match(/barriosEspeciales/);
    await waitUntilDisplayed(this.saveButton);
    await this.setCodigoPostalInput('codigoPostal');
    expect(await this.getCodigoPostalInput()).to.match(/codigoPostal/);
    await waitUntilDisplayed(this.saveButton);
    await this.setTipoCalleInput('tipoCalle');
    expect(await this.getTipoCalleInput()).to.match(/tipoCalle/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
