import { BrowserRouter, Route, Routes } from "react-router";
import Carrinho from "./pages/carrinho";
import Pagamento from "./pages/pagamento";
import Sucesso from "./pages/sucesso";
import Falha from "./pages/falha";

function App() {
  return (
    <div>
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
