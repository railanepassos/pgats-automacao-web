import { gerarUsuario } from './dados';

// Cria a conta pela API do site (rápido e estável) para testes que
// precisam de um usuário já existente (casos 2, 3, 4, 5 e 16).
Cypress.Commands.add('criarUsuarioPorApi', () => {
  return cy.fixture('usuario-base').then((base) => {
    const usuario = gerarUsuario(base);
    return cy
      .request({ method: 'POST', url: '/api/createAccount', form: true, body: usuario })
      .then((resp) => {
        // A API do site devolve HTTP 200 e o código real dentro do corpo.
        const corpo = typeof resp.body === 'string' ? JSON.parse(resp.body) : resp.body;
        expect(corpo.responseCode, 'criação do usuário por API').to.eq(201);
        return usuario;
      });
  });
});

// Limpeza: apaga a conta pela API. Falhar aqui não deve reprovar o teste.
Cypress.Commands.add('apagarUsuarioPorApi', (usuario) => {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: usuario.email, password: usuario.password },
    failOnStatusCode: false,
  });
});
