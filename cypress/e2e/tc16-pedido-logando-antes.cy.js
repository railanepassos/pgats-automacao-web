import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';
import ProdutosPage from '../support/pages/ProdutosPage';
import PedidoPage from '../support/pages/PedidoPage';

describe('Caso 16 - Fazer pedido: logar antes do checkout', () => {
  let usuario;

  beforeEach(() => {
    cy.criarUsuarioPorApi().then((u) => (usuario = u));
  });

  // Limpeza garantida mesmo se o teste falhar no meio.
  afterEach(() => {
    cy.apagarUsuarioPorApi(usuario);
  });

  it('loga e compra um produto', () => {
    cy.fixture('pagamento').then((pagamento) => {
      HomePage.abrir().verificarVisivel().irParaLogin();
      LoginPage.logar(usuario.email, usuario.password);
      HomePage.verificarLogadoComo(usuario.name).irParaProdutos();

      ProdutosPage.adicionarPrimeiroProdutoAoCarrinho();
      HomePage.irParaCarrinho();
      PedidoPage.verificarCarrinho().irParaCheckout().verificarEnderecoERevisao();
      PedidoPage.finalizarPedido('Pedido de teste automatizado').pagar(pagamento);
      PedidoPage.verificarPedidoConfirmado();
    });
  });
});
