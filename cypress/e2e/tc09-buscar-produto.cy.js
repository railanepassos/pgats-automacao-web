import HomePage from '../support/pages/HomePage';
import ProdutosPage from '../support/pages/ProdutosPage';

describe('Caso 9 - Buscar produto', () => {
  const termo = 'Blue Top';

  it('busca por nome e exibe os produtos relacionados', () => {
    HomePage.abrir().verificarVisivel().irParaProdutos();
    ProdutosPage.verificarTodosProdutos();

    ProdutosPage.contarProdutosListados().then((total) => {
      ProdutosPage.buscar(termo).verificarResultadoBusca(termo, total);
    });
  });
});
