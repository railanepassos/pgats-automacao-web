import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';
import SignupPage from '../support/pages/SignupPage';
import { gerarUsuario } from '../support/dados';

describe('Caso 1 - Registrar usuário', () => {
  it('cadastra um novo usuário e apaga a conta', () => {
    cy.fixture('usuario-base').then((base) => {
      const usuario = gerarUsuario(base);

      HomePage.abrir().verificarVisivel().irParaLogin();
      LoginPage.verificarFormularioCadastro().iniciarCadastro(usuario.name, usuario.email);
      SignupPage.verificarFormulario().preencher(usuario).criarConta().verificarContaCriada().continuar();
      HomePage.verificarLogadoComo(usuario.name).apagarConta();
    });
  });
});
