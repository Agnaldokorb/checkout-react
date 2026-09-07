import { ArrowRight, PackageCheck, ShieldCheck, Truck } from "lucide-react"
import { Link } from "react-router"
import { produtos } from "../data/produtos"
import Header from "../components/header"
import ItemCarrinho from "../components/itemCarrinho"
import ResumoCompra from "../components/resumoCompra"

export default function Carrinho() {
    return (
        <main>
            <Header />
            <section>
                <article>
                    <div>
                        <p>
                            Seu Pedido
                        </p>
                        <h1
                            id="titulo-carrinho"
                        >
                            Tudo certo no seu pedido
                        </h1>
                        <p>
                            Confira seu pedido antes de seguir para o pagamento
                        </p>
                    </div>
                    <div>
                        {produtos.map((produto) =>(
                            <ItemCarrinho key={produto.id} produto={produto} />
                        ))}
                    </div>
                    <div 
                        aria-label="Benefícios da compra"
                    >
                        <span>
                            <Truck aria-hidden="true" /> Frete Grátis
                        </span>
                        <span>
                            <PackageCheck aria-hidden="true" /> Entrega em 24h
                        </span>
                        <span>
                            <ShieldCheck aria-hidden="true" /> Compra Criptografada
                        </span>
                    </div>
                </article>

                <ResumoCompra
                    items={produtos}
                    acao={
                        <Link
                            to="/pagamento"
                        >
                            Concluir Compra <ArrowRight aria-hidden="true" />
                        </Link>
                    }
                />
            </section>
        </main>
    )
}