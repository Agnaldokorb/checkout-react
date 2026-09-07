import { ArrowRight, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router";
import { produtos } from "../data/produtos";
import Header from "../components/header";
import ItemCarrinho from "../components/itemCarrinho";
import ResumoCompra from "../components/resumoCompra";

export default function Carrinho() {
  return (
    <main className="min-h-screen bg-[#f4f6fb]">
      <Header etapa="Sacola" />
      <section className="mx-auto grid w-[min(1160px,calc(100%-24px))] grid-cols-1 items-start gap-[30px] py-[30px] pb-[52px] sm:w-[min(1160px,calc(100%-40px))] sm:py-[38px] sm:pb-20 min-[861px]:grid-cols-[minmax(0,1fr)_370px] min-[861px]:gap-12 min-[861px]:pt-[58px]">
        <article aria-labelledby="titulo-carrinho">
          <div className="mb-6 max-w-[620px] sm:mb-[35px]">
            <p className="mb-2.5 text-[0.78rem] font-extrabold tracking-[0.12em] text-[#1836d4] uppercase">
              Seu Pedido
            </p>
            <h1
              className="mb-3 font-['Manrope'] text-4xl leading-[1.05] font-extrabold tracking-[-0.055em] text-[#15203c] sm:text-[clamp(2rem,4.5vw,3.4rem)]"
              id="titulo-carrinho"
            >
              Tudo certo no seu pedido
            </h1>
            <p className="m-0 text-[1.04rem] leading-[1.6] text-[#68718a]">
              Confira seu pedido antes de seguir para o pagamento
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#dfe3ee] bg-white shadow-[0_8px_30px_rgba(19,35,92,0.05)]">
            {produtos.map((produto) => (
              <ItemCarrinho key={produto.id} produto={produto} />
            ))}
          </div>
          <div
            className="flex flex-col gap-3.5 px-0.5 pt-6 text-[0.82rem] text-[#47506a] sm:flex-row sm:flex-wrap sm:gap-x-[26px] sm:px-2.5 min-[861px]:justify-between min-[861px]:gap-3.5"
            aria-label="Benefícios da compra"
          >
            <span className="inline-flex items-center gap-2 [&_svg]:text-[#1836d4]">
              <Truck aria-hidden="true" /> Frete Grátis
            </span>
            <span className="inline-flex items-center gap-2 [&_svg]:text-[#1836d4]">
              <PackageCheck aria-hidden="true" /> Entrega em 24h
            </span>
            <span className="inline-flex items-center gap-2 [&_svg]:text-[#1836d4]">
              <ShieldCheck aria-hidden="true" /> Compra Criptografada
            </span>
          </div>
        </article>

        <ResumoCompra
          items={produtos}
          acao={
            <Link
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#c8ff2f] px-5 py-3.5 font-bold text-[#0d1d58] no-underline transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(58,95,255,0.22)]"
              to="/pagamento"
            >
              Concluir Compra <ArrowRight size={19} aria-hidden="true" />
            </Link>
          }
        />
      </section>
    </main>
  );
}
