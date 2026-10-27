# Automation Exercise - Testes E2E com Cypress

Trabalho de conclusão da disciplina **Automação de Testes na Camada de Interface (Web)** - Pós-graduação em Testes e Qualidade de Software (PGATS, Turma 3).

Aplicação testada: [Automation Exercise](https://www.automationexercise.com) (casos descritos em [Test Cases](https://www.automationexercise.com/test_cases)).

## Casos implementados

| Caso | Descrição | Spec |
|---|---|---|
| 1 | Registrar usuário | `tc01-registrar-usuario.cy.js` |
| 2 | Login com e-mail e senha corretos | `tc02-login-correto.cy.js` |
| 3 | Login com e-mail e senha incorretos | `tc03-login-incorreto.cy.js` |
| 4 | Logout | `tc04-logout.cy.js` |
| 5 | Registrar usuário com e-mail existente | `tc05-registrar-email-existente.cy.js` |
| 8 | Todos os produtos e página de detalhe | `tc08-produtos-e-detalhe.cy.js` |
| 9 | Buscar produto | `tc09-buscar-produto.cy.js` |
| 10 | Inscrição (Subscription) na home | `tc10-inscricao-home.cy.js` |
| 15 | Pedido: registrar antes do checkout | `tc15-pedido-registrando-antes.cy.js` |
| 16 | Pedido: logar antes do checkout | `tc16-pedido-logando-antes.cy.js` |

## Como rodar

Requisitos: Node.js 20 ou superior.

```bash
npm ci
npm test              # roda os 10 casos em modo headless (Electron)
npm run test:chrome   # roda no Chrome
npm run cy:open       # abre o Cypress com interface
```

O relatório HTML é gerado em `cypress/reports/index.html`.

## Integração contínua (GitHub Actions)

O workflow `.github/workflows/cypress.yml` roda a cada push na `main`, em pull requests e manualmente (`workflow_dispatch`). Ao final publica dois artefatos na página da execução:

- `relatorio-mochawesome`: relatório HTML com status, tempo e gráficos;
- `screenshots-falhas`: screenshots, só quando há falha.

## Estrutura e decisões

```
cypress/
  e2e/                 um spec por caso de teste
  fixtures/            dados estáticos (usuário base, cartão de teste)
  support/
    pages/             Page Objects (uma classe por página)
    commands.js        comandos customizados (criar/apagar usuário por API)
    dados.js           gerador de dados únicos
cypress.config.js      baseUrl, retries, reporter, bloqueio de anúncios
```

- **Seletores:** preferência por `data-qa`, depois `id`/`name`, e texto visível só para mensagens que fazem parte da verificação. Sem XPath; classes CSS só para localizar regiões da página (lista de produtos, tabela do carrinho) quando não há atributo dedicado.
- **Testes independentes:** cada teste cria o próprio usuário, com e-mail único gerado na hora, e apaga a conta no fim. Não há dependência de ordem de execução.
- **Setup por API:** os casos 2, 3, 4, 5 e 16 não são sobre o cadastro, então o usuário é criado pela API do site (`/api/createAccount`), que é mais rápido e estável. Os casos 1 e 15 fazem o cadastro pela interface, porque cadastro faz parte do fluxo testado.
- **Page Object:** os passos repetidos (login, cadastro, produtos, pedido) ficam em um lugar só.
- **Sem esperas fixas:** nenhum `cy.wait(<número>)`; o Cypress repete as asserções até passarem.
- **Estabilidade:** `retries` só em modo CI (`runMode: 2`) e bloqueio dos domínios de anúncio, que cobrem botões do site.
- **Relatório:** `cypress-mochawesome-reporter`, com screenshot embutido nas falhas.

## Observações sobre o site

- O texto "Your order has been placed successfully!" dos casos 15 e 16 não foi usado como verificação (não aparece na tela final do pedido nas execuções feitas). O site mostra "Order Placed!" e "Congratulations! Your order has been confirmed!", e o teste verifica esses textos.
- No caso 9, a busca também considera categoria e marca; o teste verifica que a lista foi filtrada e que o produto buscado aparece.
- A API de criação de conta responde HTTP 200 com o código real (201) dentro do corpo, por isso o comando valida o corpo da resposta.
