import { BrowserRouter, Route, Routes } from "react-router";
import Carrinho from "./pages/carrinho";
import Pagamento from "./pages/pagamento";
import Sucesso from "./pages/sucesso";
import Falha from "./pages/falha";

function App() {
  return (
    <div className="min-h-screen min-w-80 bg-[#f4f6fb] font-['DM_Sans'] text-[#15203c] antialiased [&_:focus-visible]:outline-3 [&_:focus-visible]:outline-offset-3 [&_:focus-visible]:outline-[#6e87ff] motion-reduce:[&_*]:transition-none motion-reduce:[&_*]:animate-none">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Carrinho />} />
          <Route path="/pagamento" element={<Pagamento />} />
          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/falha" element={<Falha />} />
          <Route path="*" element={<Carrinho />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
