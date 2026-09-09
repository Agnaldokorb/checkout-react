import { ArrowLeft, Check, RotateCcw, ShieldAlert } from "lucide-react";
import { Link } from "react-router";
import Header from "./header";

export default function ResultadoCompra({ tipo }) {
  const sucesso = tipo === "sucesso";

  return (
    <section className="min-h-screen bg-[#edf1fa]">
      <Header etapa={sucesso ? "Pedico Confirmado" : "Pagamento Recusado"} />
      <main className="mx-auto w-[min(620px,calc(100%-40px))] py-[60px] text-center sm:py-[84px]">
        <div
          className={`mx-auto mb-7 grid size-[82px] place-items-center rounded-[28px_10px] ${
            sucesso
              ? "bg-[#c8ff2f] text-[#0d1d58] shadow-[0_18px_36px_rgba(128,177,0,0.18)]"
              : "bg-[#ffd6d2] text-[#7c1f26] shadow-[0_18px_36px_rgba(160,47,47,0.12)]"
          }`}
          aria-hidden="true"
        >
          {sucesso ? <Check size={38} /> : <ShieldAlert size={40} />}
        </div>
        <p
          className={`mb-2.5 text-[0.78rem] font-extrabold tracking-[0.12em] uppercase ${sucesso ? "text-[#1836d4]" : "text-[#c93737]"}`}
        >
          {sucesso ? "Pagamento aprovado" : "Pagamento Recusado"}
        </p>
        <h1 className="mb-3 font-['Manrope'] text-4xl leading-[1.05] font-extrabold tracking-[-0.055em] text-[#15203c] sm:text-[clamp(2rem,4.5vw,3.4rem)]">
          {sucesso ? "Seu pedido Foi Confirmado" : "Tentativa de golpe"}
        </h1>
        <p className="mx-auto mb-7 max-w-[500px] leading-[1.65] text-[#68718a] text-xl">
          {sucesso
            ? "Pedido Confirmado, Seu pedido esta em separação e logo chega até você"
            : "Cartão recusado: Revise os dados e tente novamente ou tente com outro cartão"}
        </p>
        {sucesso && (
          <div className="mx-auto mb-7 grid w-[min(410px,100%)] grid-cols-2 gap-x-[22px] gap-y-[9px] rounded-2xl border border-[#dfe3ee] bg-white p-5 text-left text-sm sm:text-base [&_span]:text-[#68718a] [&_strong]:text-right">
            <span>Pedido</span>
            <strong>#CR-2026*00001</strong>
            <strong>Previsão de entrega</strong>
            <strong>Dentro de 24H</strong>
            <span className="text-red-500">
              PEDIDO SIMULADO NÃO CONSIDERAR REAL
            </span>
          </div>
        )}
        <Link
          className="inline-flex min-h-[52px] min-w-[220px] items-center justify-center gap-2.5 rounded-[14px] bg-[#c8ff2f] px-5 py-3.5 font-bold text-[#0d1d58] no-underline transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(58,95,255,0.22)]"
          to={sucesso ? "/" : "/pagamento"}
        >
          {sucesso ? (
            <>
              <ArrowLeft size={18} aria-label="true" /> Carrinho
            </>
          ) : (
            <>
              <RotateCcw size={18} aria-label="true" /> Tentar novamente
            </>
          )}
        </Link>
      </main>
    </section>
  );
}
