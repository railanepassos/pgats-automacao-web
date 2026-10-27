class PedidoPage {
  verificarCarrinho() {
    cy.url().should('include', '/view_cart');
    cy.get('#cart_info_table tbody tr').should('have.length.greaterThan', 0);
    return this;
  }

  irParaCheckout() {
    cy.contains('a', 'Proceed To Checkout').click();
    return this;
  }

  verificarEnderecoERevisao() {
    cy.contains('h2', 'Address Details').should('be.visible');
    cy.contains('h2', 'Review Your Order').should('be.visible');
    return this;
  }

  finalizarPedido(comentario) {
    cy.get('textarea[name="message"]').type(comentario);
    cy.contains('a', 'Place Order').click();
    return this;
  }

  pagar(pagamento) {
    cy.get('[data-qa="name-on-card"]').type(pagamento.nameOnCard);
    cy.get('[data-qa="card-number"]').type(pagamento.cardNumber);
    cy.get('[data-qa="cvc"]').type(pagamento.cvc);
    cy.get('[data-qa="expiry-month"]').type(pagamento.expiryMonth);
    cy.get('[data-qa="expiry-year"]').type(pagamento.expiryYear);
    cy.get('[data-qa="pay-button"]').click();
    return this;
  }

  verificarPedidoConfirmado() {
    cy.get('[data-qa="order-placed"]').should('contain.text', 'Order Placed!');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
    return this;
  }
}

export default new PedidoPage();
