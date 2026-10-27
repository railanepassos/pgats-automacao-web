class HomePage {
  abrir() {
    cy.visit('/');
    return this;
  }

  verificarVisivel() {
    cy.get('.carousel-inner').should('be.visible');
    cy.title().should('eq', 'Automation Exercise');
    return this;
  }

  irParaLogin() {
    cy.contains('a', 'Signup / Login').click();
    return this;
  }

  irParaProdutos() {
    cy.get('header a[href="/products"]').click();
    return this;
  }

  irParaCarrinho() {
    cy.get('header a[href="/view_cart"]').click();
    return this;
  }

  verificarLogadoComo(nome) {
    cy.contains('li', `Logged in as ${nome}`).should('be.visible');
    return this;
  }

  deslogar() {
    cy.contains('a', 'Logout').click();
    return this;
  }

  apagarConta() {
    cy.contains('a', 'Delete Account').click();
    cy.get('[data-qa="account-deleted"]').should('contain.text', 'Account Deleted!');
    cy.get('[data-qa="continue-button"]').click();
    return this;
  }

  // Caso 10
  inscrever(email) {
    cy.get('footer').scrollIntoView();
    cy.get('footer h2').should('have.text', 'Subscription');
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
    return this;
  }

  verificarInscricaoComSucesso() {
    cy.get('#success-subscribe')
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
    return this;
  }
}

export default new HomePage();
