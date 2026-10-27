import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';
import { gerarUsuario } from '../support/dados';

describe('Caso 3 - Login com e-mail e senha incorretos', () => {
  it('exibe erro ao tentar logar com credenciais inexistentes', () => {
    // Usuário gerado e nunca cadastrado: garante que as credenciais não existem.
    cy.fixture('usuario-base').then((base) => {
      const inexistente = gerarUsuario(base);

      HomePage.abrir().verificarVisivel().irParaLogin();
      LoginPage.verificarFormularioLogin().logar(inexistente.email, 'senha-errada');
      LoginPage.verificarErroLogin();
    });
  });
});
