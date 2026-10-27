import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';
import ProdutosPage from '../support/pages/ProdutosPage';
import PedidoPage from '../support/pages/PedidoPage';

describe('Caso 16 - Fazer pedido: logar antes do checkout', () => {
  let usuario;

  beforeEach(() => {
    cy.criarUsuarioPorApi().then((u) => (usuario = u));
  });

  it('loga, compra um produto e apaga a conta', () => {
    cy.fixture('pagamento').then((pagamento) => {
      HomePage.abrir().verificarVisivel().irParaLogin();
      LoginPage.logar(usuario.email, usuario.password);
      HomePage.verificarLogadoComo(usuario.name).irParaProdutos();

      ProdutosPage.adicionarPrimeiroProdutoAoCarrinho();
      HomePage.irParaCarrinho();
      PedidoPage.verificarCarrinho().irParaCheckout().verificarEnderecoERevisao();
      PedidoPage.finalizarPedido('Pedido de teste automatizado').pagar(pagamento);
      PedidoPage.verificarPedidoConfirmado();

      HomePage.apagarConta();
    });
  });
});
