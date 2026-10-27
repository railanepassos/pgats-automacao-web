import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';

describe('Caso 4 - Logout', () => {
  let usuario;

  beforeEach(() => {
    cy.criarUsuarioPorApi().then((u) => (usuario = u));
  });

  afterEach(() => {
    cy.apagarUsuarioPorApi(usuario);
  });

  it('desloga e volta para a página de login', () => {
    HomePage.abrir().verificarVisivel().irParaLogin();
    LoginPage.verificarFormularioLogin().logar(usuario.email, usuario.password);
    HomePage.verificarLogadoComo(usuario.name).deslogar();
    cy.url().should('include', '/login');
    LoginPage.verificarFormularioLogin();
  });
});
