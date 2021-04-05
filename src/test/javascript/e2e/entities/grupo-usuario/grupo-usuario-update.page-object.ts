import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class GrupoUsuarioUpdatePage {
  pageTitle: ElementFinder = element(by.id('gempApp.grupoUsuario.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  usuarioInput: ElementFinder = element(by.css('input#grupo-usuario-usuario'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setUsuarioInput(usuario) {
    await this.usuarioInput.sendKeys(usuario);
  }

  async getUsuarioInput() {
    return this.usuarioInput.getAttribute('value');
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
    await this.setUsuarioInput('usuario');
    expect(await this.getUsuarioInput()).to.match(/usuario/);
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
