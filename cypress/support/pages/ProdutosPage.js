class ProdutosPage {
  verificarTodosProdutos() {
    cy.url().should('include', '/products');
    cy.contains('h2', 'All Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
    return this;
  }

  abrirDetalhePrimeiroProduto() {
    cy.get('.features_items .choose a[href^="/product_details"]').first().click();
    return this;
  }

  verificarDetalheProduto() {
    cy.url().should('include', '/product_details/');
    cy.get('.product-information').within(() => {
      cy.get('h2').should('not.be.empty'); // nome
      cy.contains('p', 'Category:').should('be.visible');
      cy.contains('span', 'Rs.').should('be.visible'); // preço
      cy.contains('b', 'Availability:').should('be.visible');
      cy.contains('b', 'Condition:').should('be.visible');
      cy.contains('b', 'Brand:').should('be.visible');
    });
    return this;
  }

  buscar(termo) {
    cy.get('#search_product').type(termo);
    cy.get('#submit_search').click();
    return this;
  }

  contarProdutosListados() {
    return cy.get('.features_items .product-image-wrapper').its('length');
  }

  // O site também busca por categoria/marca, então o nome nem sempre contém o
  // termo. Verificamos que a lista foi filtrada e que o produto buscado aparece.
  verificarResultadoBusca(termo, totalAntesDaBusca) {
    cy.contains('h2', 'Searched Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper')
      .should('have.length.greaterThan', 0)
      .and('have.length.lessThan', totalAntesDaBusca);
    cy.get('.features_items .productinfo p').then(($nomes) => {
      const nomes = $nomes.toArray().map((n) => n.innerText.toLowerCase());
      expect(nomes, 'nomes dos produtos encontrados').to.satisfy((lista) =>
        lista.some((nome) => nome.includes(termo.toLowerCase())),
      );
    });
    return this;
  }

  // Adiciona o primeiro produto ao carrinho e fecha o modal de confirmação.
  adicionarPrimeiroProdutoAoCarrinho() {
    cy.get('.features_items .product-image-wrapper').first().trigger('mouseover');
    cy.get('.features_items .productinfo .add-to-cart').first().click({ force: true });
    cy.get('#cartModal').should('be.visible');
    cy.contains('#cartModal button', 'Continue Shopping').click();
    return this;
  }
}

export default new ProdutosPage();
