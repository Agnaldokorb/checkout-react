import { calcularSubtotal, formatarMoeda } from "../utils/moeda"

export default function ItemCarrinho({produto, compacto = false}) {
    const Icone = produto.Icone
    const Corres = {
        Preta: "bg-black",
        Verde: "bg-green",
        Branco: "bg-white",
        NA: "bg-transparent",
    }

    const classeItem = compacto
        ? "border-[#dfe3ee]"
        : "border-[#dfe3ee]"

    return (
        <article className={classeItem}>
            <div>
                <Icone />                
            </div>

            <div>
                {!compacto && (
                    <p>
                        {produto.categoria}
                    </p>
                )}
                <h3>
                    {produto.nome}
                </h3>
                {!compacto && (
                    <p>
                        {formatarMoeda(produto.preco)} cada
                    </p>
                )}
            </div>
            <div>
                {compacto && (
                    <span>
                        Quantidade: {produto.quantidade}
                    </span>
                )}
                <strong>
                    {formatarMoeda(calcularSubtotal(produto))}
                </strong>
            </div>
        </article>
    )
}

