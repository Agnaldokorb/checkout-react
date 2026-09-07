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

const classeInput = "";

function Campo({ id, label, erro, children }) {
  return (
    <div>
      <label htmlFor="id">{label}</label>
      {children}
      {erro && (
        <p id={`${id}-erro`} role="alert">
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
    <main>
      <Header etapa="Pagamento" />
      <section>
        <article aria-labelledby="titulo-pagamento">
          <Link to="/">
            <ArrowLeft aria-hidden="true" /> Voltar ao carrinho
          </Link>
          <div>
            <p>Última etapa</p>
            <h1 id="titulo-pagamento">Como você quer pagar?</h1>
            <p>
              Esse processo é somente uma simulação! Ultilize dados ficticios!
            </p>
          </div>

          <form onSubmit={handleSubmit(pagar)} noValidate>
            <div>
              <span>
                <CreditCard aria-hidden="true" />
              </span>
              <div>
                <strong>Cartão de credito</strong>
                <small>Pagamento Simulado</small>
              </div>
              <span aria-hidden="true" />
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
              label="Número do cartão"
              erro={errors.numeroCartao?.message}
            >
              <div>
                <input
                  className={classeInput}
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
                <CreditCard aria-hidden="true" />
              </div>
            </Campo>

            <div>
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
                <small id="cvv-ajuda">3 dígitos no verso</small>
              </Campo>
            </div>

            <button type="submit" disabled={processando} aria-live="polite">
              {processando ? (
                <>
                  <span aria-hidden="true"> Processando Compra...</span>
                </>
              ) : (
                <>
                  <LockKeyhole aria-hidden="true" /> Fazer Pagamento
                </>
              )}
            </button>
          </form>
        </article>

        <div>
          <div>
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
