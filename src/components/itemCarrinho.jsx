import { calcularSubtotal, formatarMoeda } from "../utils/moeda";

export default function ItemCarrinho({ produto, compacto = false }) {
  const Icone = produto.Icone;
  const cores = {
    Preta: "bg-black text-white",
    Verde: "bg-green ",
    Branco: "bg-white text-blue",
    NA: "bg-transparent text-red",
  };

  const classeItem = compacto
    ? "grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-3 border-t border-[#dfe3ee] py-3.5 first:border-t-0"
    : "grid grid-cols-[58px_minmax(0,1fr)] items-center gap-[13px] border-t border-[#dfe3ee] p-[17px] first:border-t-0 sm:grid-cols-[76px_minmax(0,1fr)_auto] sm:gap-[18px] sm:p-[22px]";

  return (
    <article className={classeItem}>
      <div
        className={`grid place-items-center overflow-hidden ${compacto ? "size-11 rounded-xl" : "size-[58px] rounded-[15px] sm:size-[76px] sm:rounded-[18px]"} ${cores[produto.cor]}`}
        aria-hidden="true"
      >
        <Icone
          className="-rotate-6"
          size={compacto ? 22 : 32}
          strokeWidth={1.8}
        />
      </div>

      <div className="min-w-0">
        {!compacto && (
          <p className="mb-[3px] text-[0.78rem] tracking-[0.08em] text-[#68718a] uppercase">
            {produto.categoria}
          </p>
        )}
        <h3
          className={`truncate font-semibold text-[#15203c] ${compacto ? "m-0 text-[0.84rem]" : "mb-[5px] font-['Manrope'] text-base tracking-[-0.02em]"}`}
        >
          {produto.nome}
        </h3>
        {!compacto && (
          <p className="m-0 text-sm text-[#68718a]">
            {formatarMoeda(produto.preco)} cada
          </p>
        )}
      </div>

      <div
        className={
          compacto
            ? "flex flex-col items-end gap-2"
            : "col-start-2 flex w-full min-w-0 items-center justify-between sm:col-auto sm:min-w-28 sm:flex-col sm:items-end sm:justify-start sm:gap-2"
        }
      >
        {!compacto && (
          <span className="text-[0.82rem] text-[#68718a]">
            Quantidade: {produto.quantidade}
          </span>
        )}
        <strong className={compacto ? "text-[0.82rem]" : ""}>
          {formatarMoeda(calcularSubtotal(produto))}
        </strong>
      </div>
    </article>
  );
}
