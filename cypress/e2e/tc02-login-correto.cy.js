import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';

describe('Caso 2 - Login com e-mail e senha corretos', () => {
  let usuario;

  beforeEach(() => {
    cy.criarUsuarioPorApi().then((u) => (usuario = u));
  });

  it('loga com credenciais válidas e apaga a conta', () => {
    HomePage.abrir().verificarVisivel().irParaLogin();
    LoginPage.verificarFormularioLogin().logar(usuario.email, usuario.password);
    HomePage.verificarLogadoComo(usuario.name).apagarConta();
  });
});
