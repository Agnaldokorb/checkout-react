import { calcularTotal, formatarMoeda } from "../utils/moeda";

export default function ResumoCompra({ items, acao, compacto = false }) {
  const total = calcularTotal(items);
  const classeResumo = `rounded-[20px] bg-[#0d1d58] p-[22px] text-[#dfe5ff] shadow-[0_24px_60px_rgba(19,35,92,0.1)] sm:rounded-[26px] sm:p-7 ${
    compacto
      ? "max-[860px]:p-[18px_22px]"
      : "min-[861px]:sticky min-[861px]:top-6"
  }`;

  return (
    <aside className={classeResumo} aria-labelledby="titulo-resumo">
      <h2
        className={`mb-[26px] font-['Manrope'] text-xl font-bold text-white ${compacto ? "max-[860px]:hidden" : ""}`}
        id="titulo-resumo"
      >
        Resumo do pedido
      </h2>
      <dl className={`m-0 ${compacto ? "max-[860px]:hidden" : ""}`}>
        <div className="mb-[15px] flex justify-between">
          <dt>Produtos no carrinho</dt>
          <dd className="m-0 font-semibold text-white">
            {formatarMoeda(total)}
          </dd>
        </div>
        <div className="mb-[15px] flex justify-between">
          <dt>Custo de entrega</dt>
          <dd className="m-0 font-semibold text-[#c8ff2f]">Frete Grátis</dd>
        </div>
      </dl>
      <div
        className={`my-[25px] -mx-[22px] grid grid-cols-[1fr_auto] gap-[5px] border-y border-white/15 px-[22px] py-6 sm:-mx-7 sm:px-7 ${compacto ? "max-[860px]:m-0 max-[860px]:border-0 max-[860px]:p-0" : ""}`}
      >
        <span>Total</span>
        <strong className="font-['Manrope'] text-[1.45rem] text-white">
          {formatarMoeda(total)}
        </strong>
        <small
          className={`col-span-full text-[#aeb9e9] ${compacto ? "max-[860px]:hidden" : ""}`}
        >
          Ou em 12x de {formatarMoeda(total / 12)} sem juros
        </small>
      </div>
      {acao}
      <p
        className={`mt-[15px] mb-0 text-center text-xs text-[#aeb9e9] ${compacto ? "max-[860px]:hidden" : ""}`}
      >
        Compra protegida: Seu pagamento será CRIPTOGRAFADO.
      </p>
      <p
        className={`mt-[15px] mb-0 text-center text-[1.45rem] text-red-500 ${compacto ? "max-[860px]:hidden" : ""}`}
      >
        Essa compra é somente uma simulação!
      </p>
    </aside>
  );
}
