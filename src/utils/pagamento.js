export const limparNumeroCartao = (numero) => 
    numero.replace(/[\s-]/g, "");

export const possuiDigitosIguais = (numero) => {
  const numeroLimpo = limparNumeroCartao(numero);
  return /^(\d)\1{15}$/.test(numeroLimpo);
};

export const processarPagamento = (numeroCartao) =>
  new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ aprovado: !possuiDigitosIguais(numeroCartao) });
    }, 3600);
  });
