import { calcularTotal, formatarMoeda } from "../utils/moeda"

export default function ResumoCompra({ items, acao, compacto = false }) {
    const total = calcularTotal(items)
    const claseResumo = `${compacto  ? "max-[860px]:" : "min-[861px]:"}`

    return (
        <aside 
            aria-labelledby="titulo-resumo"
        >
            <h2>
                Resumo do pedido
            </h2>
            <dl>
                <div>
                    <dt>Produtos no carrinho</dt>
                    <dd>
                        {formatarMoeda(total)}
                    </dd>
                </div>
                <div>
                    <dt>Custo de entrega</dt>
                    <dd>Grátis</dd>
                </div>
            </dl>
            <div>
                <span>Total</span>
                <strong>
                    {formatarMoeda(total)}
                </strong>
                <small>
                    Ou em 12x de {formatarMoeda(total / 12)} sem juros
                </small>
            </div>
            {acao}
            <p>
                Compra protegida: Seu pagamento será CRIPTOGRAFADO.
            </p>
            <p>
                Essa compra é somente uma simulação!
            </p>
        </aside>
    )
}