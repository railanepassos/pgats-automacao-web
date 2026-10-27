class LoginPage {
  verificarFormularioLogin() {
    cy.contains('h2', 'Login to your account').should('be.visible');
    return this;
  }

  verificarFormularioCadastro() {
    cy.contains('h2', 'New User Signup!').should('be.visible');
    return this;
  }

  logar(email, senha) {
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha, { log: false });
    cy.get('[data-qa="login-button"]').click();
    return this;
  }

  iniciarCadastro(nome, email) {
    cy.get('[data-qa="signup-name"]').type(nome);
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();
    return this;
  }

  verificarErroLogin() {
    cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
    return this;
  }

  verificarErroEmailExistente() {
    cy.contains('p', 'Email Address already exist!').should('be.visible');
    return this;
  }
}

export default new LoginPage();
