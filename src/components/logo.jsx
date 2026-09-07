import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      className="inline-flex items-center gap-2.5 font-['Manrope'] text-xl font-extrabold tracking-[-0.04em] no-underline"
      to="/"
      aria-label="Voltar ao carrinho"
    >
      <span
        className="grid size-[34px] place-items-center rounded-[11px_4px] bg-[#0d1d58] text-base text-[#c8ff2f]"
        aria-hidden="true"
      >
        CR
      </span>
      <span>CheckOut-React</span>
    </Link>
  );
}
