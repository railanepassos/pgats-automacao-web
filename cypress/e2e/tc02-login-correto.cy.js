import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';

describe('Caso 2 - Login com e-mail e senha corretos', () => {
  let usuario;

  beforeEach(() => {
    cy.criarUsuarioPorApi().then((u) => (usuario = u));
  });

  // Limpeza garantida mesmo se o teste falhar no meio.
  afterEach(() => {
    cy.apagarUsuarioPorApi(usuario);
  });

  it('loga com credenciais válidas', () => {
    HomePage.abrir().verificarVisivel().irParaLogin();
    LoginPage.verificarFormularioLogin().logar(usuario.email, usuario.password);
    HomePage.verificarLogadoComo(usuario.name);
  });
});
