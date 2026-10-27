import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';

describe('Caso 5 - Registrar usuário com e-mail existente', () => {
  let usuario;

  beforeEach(() => {
    cy.criarUsuarioPorApi().then((u) => (usuario = u));
  });

  afterEach(() => {
    cy.apagarUsuarioPorApi(usuario);
  });

  it('exibe erro ao cadastrar um e-mail já registrado', () => {
    HomePage.abrir().verificarVisivel().irParaLogin();
    LoginPage.verificarFormularioCadastro().iniciarCadastro(usuario.name, usuario.email);
    LoginPage.verificarErroEmailExistente();
  });
});
