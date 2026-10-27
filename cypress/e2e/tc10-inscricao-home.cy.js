import HomePage from '../support/pages/HomePage';
import { gerarUsuario } from '../support/dados';

describe('Caso 10 - Inscrição (Subscription) na home', () => {
  it('inscreve um e-mail pelo rodapé e exibe a mensagem de sucesso', () => {
    cy.fixture('usuario-base').then((base) => {
      const { email } = gerarUsuario(base);

      HomePage.abrir().verificarVisivel().inscrever(email).verificarInscricaoComSucesso();
    });
  });
});
