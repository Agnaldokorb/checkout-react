import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard, LockKeyhole } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { z } from "zod";
import { produtos } from "../data/produtos";
import { usePagamento } from "../hooks/usePagamento";
import { limparNumeroCartao } from "../utils/pagamento";
import Header from "../components/header";
import ItemCarrinho from "../components/itemCarrinho";
import ResumoCompra from "../components/resumoCompra";

const shemaPagamento = z.object({
  titular: z.string().trim().min(2, "Informe o nome impresso no cartão"),
  numeroCartao: z
    .string()
    .refine(
      (valor) => /^\d{16}$/.test(limparNumeroCartao(valor)),
      "Digite os 16 numeros do cartão",
    ),
  validade: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Obrigatorio o formato MM/AA valido!"),
  cvv: z.string().regex(/^\d{3}$/, "Informe os 3 numeros do CVV"),
});

const formatarCartao = (valor) =>
  valor
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatarValidade = (valor) => {
  const numeros = valor.replace(/\D/g, "").slice(0, 4);
  return numeros.length > 2
    ? `${numeros.slice(0, 2)}/${numeros.slice(2)}`
    : numeros;
};

const classeInput =
  "min-h-[50px] w-full rounded-xl border border-[#cfd5e4] bg-[#fbfcff] px-3.5 py-3 text-[#15203c] transition placeholder:text-[#9ca4b7] focus:border-[#1836d4] focus:outline-none focus:ring-3 focus:ring-[#1836d4]/10 aria-[invalid=true]:border-[#c93737]";

function Campo({ id, label, erro, children }) {
  return (
    <div className="mb-[19px]">
      <label className="mb-2 block text-sm font-bold" htmlFor={id}>
        {label}
      </label>
      {children}
      {erro && (
        <p
          className="mt-1.5 mb-0 text-[0.8rem] text-[#c93737]"
          id={`${id}-erro`}
          role="alert"
        >
          {erro}
        </p>
      )}
    </div>
  );
}

export default function Pagamento() {
  const { pagar, processando } = usePagamento();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(shemaPagamento), mode: "onBlur" });

  const numero = register("numeroCartao");
  const validade = register("validade");

  return (
    <main className="min-h-screen bg-[#f4f6fb]">
      <Header etapa="Pagamento" />
      <section className="mx-auto grid w-[min(1160px,calc(100%-24px))] grid-cols-1 items-start gap-[30px] py-[30px] pb-[52px] sm:w-[min(1160px,calc(100%-40px))] sm:py-[38px] sm:pb-20 min-[861px]:grid-cols-[minmax(0,1fr)_370px] min-[861px]:gap-12 min-[861px]:pt-[58px]">
        <article aria-labelledby="titulo-pagamento">
          <Link
            className="inline-flex items-center gap-2 text-sm text-[#68718a] no-underline transition-colors hover:text-[#1836d4]"
            to="/"
          >
            <ArrowLeft size={17} aria-hidden="true" /> Voltar ao carrinho
          </Link>
          <div className="my-5 mb-6 max-w-[620px] sm:mb-7">
            <p className="mb-2.5 text-[0.78rem] font-extrabold tracking-[0.12em] text-[#1836d4] uppercase">
              Última etapa
            </p>
            <h1
              className="mb-3 font-['Manrope'] text-4xl leading-[1.05] font-extrabold tracking-[-0.055em] text-[#15203c] sm:text-[clamp(2rem,4.5vw,3.4rem)]"
              id="titulo-pagamento"
            >
              Como você quer pagar?
            </h1>
            <p className="m-0 text-[1.04rem] leading-[1.6] text-red-500">
              Esse processo é somente uma simulação! Ultilize dados ficticios!
            </p>
          </div>

          <form
            className="rounded-[20px] border border-[#dfe3ee] bg-white p-[22px] shadow-[0_12px_40px_rgba(19,35,92,0.06)] sm:rounded-3xl sm:p-7"
            onSubmit={handleSubmit(pagar)}
            noValidate
          >
            <div className="mb-[26px] grid grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-[#dfe3ee] pb-[22px]">
              <span className="grid size-11 place-items-center rounded-xl bg-[#edf0ff] text-[#1836d4]">
                <CreditCard size={22} aria-hidden="true" />
              </span>
              <div>
                <strong className="block">Cartão de credito</strong>
                <small className="mt-[3px] block text-[#68718a]">
                  Pagamento Simulado
                </small>
              </div>
              <span
                className="size-[18px] rounded-full border-[5px] border-[#1836d4]"
                aria-hidden="true"
              />
            </div>

            <Campo
              id="titular"
              label="Nome no Cartão"
              erro={errors.titular?.message}
            >
              <input
                className={classeInput}
                id="titular"
                type="text"
                autoComplete="cc-name"
                placeholder="Nome impresso no cartão"
                aria-invalid={Boolean(errors.titular)}
                aria-describedby={errors.titular ? "titular-erro" : undefined}
                {...register("titular")}
              />
            </Campo>

            <Campo
              id="numeroCartao"
              label={
                <span className="flex items-center gap-2">                  
                  Número do cartão
                  <CreditCard size={18} />
                </span>
              }
              erro={errors.numeroCartao?.message}
            >
              <div>
                <input
                  className={`${classeInput} pr-[46px]`}
                  id="numeroCartao"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  aria-invalid={Boolean(errors.numeroCartao)}
                  aria-describedby={
                    errors.numeroCartao ? "nomeroCartao-erro" : undefined
                  }
                  {...numero}
                  onChange={(evento) =>
                    setValue(
                      "numeroCartao",
                      formatarCartao(evento.target.value),
                      { shouldValidate: false },
                    )
                  }
                />
              </div>
            </Campo>

            <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-4">
              <Campo
                id="validade"
                label="Validade"
                erro={errors.validade?.message}
              >
                <input
                  className={classeInput}
                  id="validade"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/AA"
                  maxLength="5"
                  aria-invalid={Boolean(errors.validade)}
                  aria-describedby={
                    errors.validade ? "validade-erro" : undefined
                  }
                  {...validade}
                  onChange={(evento) =>
                    setValue(
                      "validade",
                      formatarValidade(evento.target.value),
                      { shouldValidate: false },
                    )
                  }
                />
              </Campo>

              <Campo id="cvv" label="CVV" erro={errors.cvv?.message}>
                <input
                  className={classeInput}
                  id="cvv"
                  type="text"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="000"
                  maxLength="3"
                  aria-invalid={Boolean(errors.cvv)}
                  aria-describedby={errors.cvv ? "cvv-erro" : "cvv-ajuda"}
                  {...register("cvv", {
                    onChange: (evento) =>
                      setValue(
                        "cvv",
                        evento.target.value.replace(/\D/g, "").slice(0, 3),
                      ),
                  })}
                />
                <small
                  id="cvv-ajuda"
                  className="mt-1.5 block text-xs text-[#0647fa]"
                >
                  3 dígitos no verso
                </small>
              </Campo>
            </div>

            <button
              className="inline-flex min-h-[52px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[14px] border-0 bg-[#c8ff2f] px-5 py-3.5 font-bold text-[#0d1d58] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(58,95,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              type="submit"
              disabled={processando}
              aria-live="polite"
            >
              {processando ? (
                <>
                  <span
                    className="size-[18px] animate-spin rounded-full border-2 border-[#0d1d58]/25 border-t-[#0d1d58]"
                    aria-hidden="true"
                  />{" "}
                  Processando Pagamento…
                </>
              ) : (
                <>
                  <LockKeyhole size={18} aria-hidden="true" /> Fazer Pagamento
                </>
              )}
            </button>
          </form>
        </article>

        <div className="order-first flex flex-col gap-[18px] min-[861px]:order-none">
          <div className="hidden rounded-[20px] border border-[#dfe3ee] bg-white px-5 py-2 min-[861px]:block">
            {produtos.map((produto) => (
              <ItemCarrinho key={produto.id} produto={produto} compacto />
            ))}
          </div>
          <ResumoCompra items={produtos} compacto />
        </div>
      </section>
    </main>
  );
}
