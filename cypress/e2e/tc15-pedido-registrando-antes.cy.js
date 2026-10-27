import HomePage from '../support/pages/HomePage';
import LoginPage from '../support/pages/LoginPage';
import SignupPage from '../support/pages/SignupPage';
import ProdutosPage from '../support/pages/ProdutosPage';
import PedidoPage from '../support/pages/PedidoPage';
import { gerarUsuario } from '../support/dados';

describe('Caso 15 - Fazer pedido: registrar antes do checkout', () => {
  it('cadastra, compra um produto e apaga a conta', () => {
    cy.fixture('usuario-base').then((base) => {
      cy.fixture('pagamento').then((pagamento) => {
        const usuario = gerarUsuario(base);

        HomePage.abrir().verificarVisivel().irParaLogin();
        LoginPage.iniciarCadastro(usuario.name, usuario.email);
        SignupPage.preencher(usuario).criarConta().verificarContaCriada().continuar();
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
});
