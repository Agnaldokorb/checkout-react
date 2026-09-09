# Checkout React

Aplicação de checkout desenvolvida em React para simular o fluxo de finalização de uma compra. O usuário pode conferir um carrinho fixo, visualizar subtotais e o total do pedido, preencher dados fictícios de cartão e receber o resultado da compra.

> Este projeto realiza apenas uma simulação no navegador. Nenhum pagamento real é processado e nenhum dado de cartão é armazenado.

## Objetivo

O projeto foi criado para oferecer uma interface simples e responsiva de finalização de compras, aplicando conceitos de componentes, propriedades, estado, formulários, validação, processamento assíncrono e navegação entre páginas com React.

## Funcionalidades

- Exibição de um carrinho fixo com quatro produtos.
- Cálculo do subtotal de cada produto e do total da compra.
- Formatação dos valores em reais.
- Navegação entre carrinho, pagamento, sucesso e falha.
- Formulário de pagamento com validação de titular, número do cartão, validade e CVV.
- Aceitação de números de cartão digitados com espaços ou hífens.
- Simulação assíncrona do processamento da compra.
- Bloqueio do botão enquanto o pagamento está sendo processado.
- Aprovação de cartões válidos cujos dígitos não sejam todos iguais.
- Reprovação de cartões com os 16 dígitos iguais.
- Interface responsiva para celular e computador.
- Rótulos, mensagens de erro, foco visível e outros recursos de acessibilidade.

## Fluxo da aplicação

1. Na rota `/`, o usuário confere os produtos, quantidades, subtotais e total.
2. Ao selecionar **Concluir Compra**, é direcionado para `/pagamento`.
3. O formulário valida os dados fictícios do cartão.
4. Durante o envio, a aplicação mostra **Processando compra…** e desabilita o botão.
5. Um cartão com todos os dígitos iguais direciona para `/falha`.
6. Os demais cartões com formato válido direcionam para `/sucesso`.

## Validações do pagamento

- **Titular:** nome preenchido.
- **Número do cartão:** exatamente 16 dígitos; espaços e hífens são desconsiderados.
- **Validade:** formato `MM/AA`, com mês entre `01` e `12`.
- **CVV:** exatamente três dígitos.

Não são realizadas validações de bandeira, algoritmo de Luhn ou vencimento real do cartão.

## Tecnologias utilizadas

- React
- JavaScript e JSX
- Vite
- React Router
- React Hook Form
- Zod
- Tailwind CSS
- Material UI
- Lucide React
- CSS responsivo

## Estrutura do projeto

```text
checkout-react/
├── public/
├── src/
│   ├── assets/style/       # Estilos da aplicação
│   ├── components/         # Componentes reutilizáveis
│   ├── data/               # Array fixo de produtos
│   ├── hooks/              # Custom hook de pagamento
│   ├── pages/              # Carrinho, pagamento, sucesso e falha
│   ├── utils/              # Cálculos, moeda e regra de pagamento
│   ├── App.jsx             # Configuração das rotas
│   └── main.jsx            # Ponto de entrada
├── package.json
└── vite.config.js
```

## Como executar

### Pré-requisitos

- Node.js instalado.
- npm instalado.

### Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone https://github.com/Agnaldokorb/checkout-react.git
cd checkout-react
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço apresentado pelo Vite, normalmente `http://localhost:5173`.

### Outros comandos

```bash
npm run lint
npm run build
npm run preview
```

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Carrinho de compras |
| `/pagamento` | Formulário de pagamento |
| `/sucesso` | Confirmação da compra aprovada |
| `/falha` | Resultado da compra recusada |

## Componentização e organização

Os produtos ficam separados da interface em um módulo de dados. Os cálculos de subtotal, total e formatação monetária estão em funções utilitárias. A lógica assíncrona do pagamento utiliza o custom hook `usePagamento`, que controla o estado de processamento e realiza a navegação programática após o resultado.

Os componentes `Header`, `Logo`, `ItemCarrinho`, `ResumoCompra` e `ResultadoCompra` recebem propriedades e são reutilizados nas diferentes etapas do fluxo.

## Investigação com o debugger

O debugger do navegador foi utilizado no arquivo `usePagamento.js`. Foram adicionados breakpoints durante a execução, sem modificar o código, para acompanhar:

- O número do cartão recebido pelo custom hook.
- A mudança do estado `processando`.
- O retorno assíncrono de `processarPagamento`.
- O valor de `resultado.aprovado`.
- A escolha entre as rotas `/sucesso` e `/falha`.

O teste com um número formado por dígitos diferentes confirmou a aprovação da compra. O teste com `1111 1111 1111 1111` confirmou a reprovação por todos os dígitos serem iguais.

![Debugger pausado durante a investigação do pagamento](/src/assets/img/print-debbuger-1.png)

## Organização do desenvolvimento

O desenvolvimento foi dividido entre uma branch de integração, feature branches para as funcionalidades e uma branch de correção. Entre as tarefas realizadas estão a criação da arquitetura, modelagem dos produtos, funções utilitárias, componentes, páginas, rotas, estilização e correções feitas após a revisão do enunciado.

## Uso de inteligência artificial

A inteligência artificial foi utilizada como apoio na revisão dos requisitos e na organização da documentação. As sugestões foram conferidas com o enunciado e com o comportamento da aplicação. O fluxo de pagamento também foi validado manualmente com o debugger do navegador.

## Melhorias futuras

- Criar testes automatizados para as validações e regras de pagamento.
- Ampliar os testes de acessibilidade em diferentes leitores de tela.
- Executar testes visuais em mais tamanhos de tela e navegadores.
- Melhorar o detalhamento das mensagens apresentadas ao usuário.

## Links da entrega

- **Repositório no GitHub:** [[Link GitHub]](https://github.com/Agnaldokorb/checkout-react.git)
- **Quadro público no Trello:** [[Link para o Trello]](https://trello.com/invite/b/6a9ed6eda0aa18b737ef78a6/ATTIfa0e32874295af71601668c6b8b10a2cEF0195FB/checkout-react)
- **Vídeo de apresentação:** [[Link Video Apresentação]](https://google.com)
- **Aplicação publicada:** [[Link Publicado Vercel]](https://checkout-react-gamma.vercel.app/)

## Checklist antes da entrega

- [X] Adicionar o link correto do repositório.
- [X] Adicionar o link público do Trello.
- [ ] Adicionar o link do vídeo com permissão para visualização.
- [ ] Confirmar que o código final está integrado à branch `main`.
- [ ] Confirmar o acesso do avaliador ao repositório.
- [ ] Conferir se o vídeo possui no máximo sete minutos.
- [ ] Enviar todos os links solicitados no AVA dentro do prazo.
