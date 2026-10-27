import HomePage from '../support/pages/HomePage';
import ProdutosPage from '../support/pages/ProdutosPage';

describe('Caso 8 - Todos os produtos e página de detalhe', () => {
  it('lista os produtos e abre o detalhe do primeiro', () => {
    HomePage.abrir().verificarVisivel().irParaProdutos();
    ProdutosPage.verificarTodosProdutos().abrirDetalhePrimeiroProduto().verificarDetalheProduto();
  });
});
