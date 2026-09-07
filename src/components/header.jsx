import { ShoppingBag } from "lucide-react";
import Logo from "./logo.jsx";
import { produtos } from "../data/produtos.js";

export default function Header({etapa}) {
    const quantidade = produtos.reduce(
        (total, item) => total + item.quantidade,0,
    )


    return (
        <header>
            <div>
                <Logo />
                <div>
                    <span>{etapa}</span>
                    <span>
                        <ShoppingBag aria-hidden="true" />
                        {quantidade}
                    </span>
                </div>
            </div>
        </header>
    )
}    