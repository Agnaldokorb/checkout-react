export const formatarMoeda = (valor) =>
  new Intl.NumberFormat("pt-BR", { 
    style: "currency", 
    currency: "BRL" 
}).format(
    valor,
  );

export const calcularSubtotal = (produto) => 
    produto.preco * produto.quantidade;

export const calcularTotal = (itens) =>
  itens.reduce((total, item) => 
    total + calcularSubtotal(item), 
0);