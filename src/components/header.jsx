import { ShoppingBag } from "lucide-react";
import Logo from "./logo.jsx";
import { produtos } from "../data/produtos.js";

export default function Header({ etapa }) {
  const quantidade = produtos.reduce(
    (total, item) => total + item.quantidade,
    0,
  );

  return (
    <header className="border-b border-[#dfe3ee] bg-white">
      <div className="mx-auto flex min-h-[66px] w-[min(1160px,calc(100%-24px))] items-center justify-between sm:min-h-[76px] sm:w-[min(1160px,calc(100%-40px))]">
        <Logo />
        <div
          className="flex items-center gap-5 text-sm font-semibold text-[#68718a]"
          aria-label={`Etapa atual: ${etapa}`}
        >
          <span className="hidden sm:inline">{etapa}</span>
          <span
            className="inline-flex items-center gap-2 rounded-full bg-[#f1f3fa] px-3 py-2.5 text-[#15203c]"
            aria-label={`${quantidade} itens no carrinho`}
          >
            <ShoppingBag size={18} aria-hidden="true" />
            {quantidade}
          </span>
        </div>
      </div>
    </header>
  );
}
