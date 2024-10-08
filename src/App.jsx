import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/Home/page";
import HistoriasPage from "./routes/Trancando-Historias/page";
import AfetoPage from "./routes/Tranca-e-Afeto/page";
import CuidadosPage from "./routes/Cuidados-Pos-Tranca/page";
import { NotFound } from "./routes/Not-Found/page";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trancando-historias" element={<HistoriasPage/>}/>
        <Route path="/tranca-e-afeto" element={<AfetoPage/>}/>
        <Route path="/cuidados-pos-tranca" element={<CuidadosPage/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;