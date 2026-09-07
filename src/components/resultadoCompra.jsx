import { ArrowLeft, Check, RotateCcw, ShieldAlert } from "lucide-react"
import { Link } from "react-router"
import Header from "./header"

export default function ResultadoCompra({ tipo }) {
    const sucesso = tipo === "sucesso"

    return (
        <section>
            <Header etapa={sucesso ? "Pedico Confirmado" : "Pagamento Recusado"} />
            <main>
                <div
                    aria-hidden="true"
                >
                    {sucesso ? <Check /> : <ShieldAlert />}
                </div>
                <p>
                    {sucesso ? "Pagamento aprovado" : "Pagamento Recusado"}
                </p>
                <h1>
                    {sucesso ? "Seu pedido Foi Confirmado" : "Seu pedido foi Recusado"}
                </h1>
                <p>
                    {sucesso 
                        ? "Pedido Confirmado, Seu pedido esta em separação e logo chega até você" 
                        : "Cartão recusado: Revise os dados e tente novamente ou tente com outro cartão"
                    } 
                </p>
                {sucesso && (
                    <div>
                        <span>Pedido</span>
                        <strong>#CR-2026*00001</strong>
                        <strong>Previsão de entrega</strong>
                        <strong>Dentro de 24H</strong>
                        <span>PEDIDO SIMULADO NÃO CONSIDERAR REAL</span>
                    </div>
                )}
                <Link
                to={sucesso ? "/" : "/pagamento"}
                >
                    {sucesso ? (
                        <>
                            <ArrowLeft aria-label="true" /> Carrinho
                        </>
                    ) : (
                        <>
                            <RotateCcw aria-label="true" /> Tentar novaente
                        </>
                    )}
                </Link>
            </main>
        </section>
    )
}