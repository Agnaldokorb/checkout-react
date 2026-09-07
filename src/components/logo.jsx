import { Link } from "lucide-react";

export default function Logo() {
    return (
        <Link 
            to="/"
            aria-label="Voltar ao carrinho"
        >
            <span
                aria-hidden="true"
            >
                C
            </span>
            <span>CheckOut-React</span>
        </Link>
    )
}