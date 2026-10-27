class SignupPage {
  verificarFormulario() {
    cy.contains('b', 'Enter Account Information').should('be.visible');
    return this;
  }

  preencher(usuario) {
    cy.get(usuario.title === 'Mr' ? '#id_gender1' : '#id_gender2').check();
    cy.get('[data-qa="password"]').type(usuario.password, { log: false });
    cy.get('[data-qa="days"]').select(usuario.birth_date);
    cy.get('[data-qa="months"]').select(Number(usuario.birth_month) - 1);
    cy.get('[data-qa="years"]').select(usuario.birth_year);
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    cy.get('[data-qa="first_name"]').type(usuario.firstname);
    cy.get('[data-qa="last_name"]').type(usuario.lastname);
    cy.get('[data-qa="company"]').type(usuario.company);
    cy.get('[data-qa="address"]').type(usuario.address1);
    cy.get('[data-qa="address2"]').type(usuario.address2);
    cy.get('[data-qa="country"]').select(usuario.country);
    cy.get('[data-qa="state"]').type(usuario.state);
    cy.get('[data-qa="city"]').type(usuario.city);
    cy.get('[data-qa="zipcode"]').type(usuario.zipcode);
    cy.get('[data-qa="mobile_number"]').type(usuario.mobile_number);
    return this;
  }

  criarConta() {
    cy.get('[data-qa="create-account"]').click();
    return this;
  }

  verificarContaCriada() {
    cy.get('[data-qa="account-created"]').should('contain.text', 'Account Created!');
    return this;
  }

  continuar() {
    cy.get('[data-qa="continue-button"]').click();
    return this;
  }
}

export default new SignupPage();
