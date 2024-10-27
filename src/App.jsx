import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/Home/page";
import Login from "./routes/Login/Login";
import HistoriasPage from "./routes/Trancando-Historias/page";
import AfetoPage from "./routes/Tranca-e-Afeto/page";
import CuidadosPage from "./routes/Cuidados-Pos-Tranca/page";
import { NotFound } from "./routes/Not-Found/page";
import ServicosPage from "./routes/Servicos/page";
import ClientesPage from "./routes/Sistema-Clientes/page";
import CadastroPage from "./routes/Cadastro/page";
import Agendamentos from "./routes/Agendamentos/page";


function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trancando-historias" element={<HistoriasPage/>}/>
        <Route path="/tranca-e-afeto" element={<AfetoPage/>}/>
        <Route path="/cuidados-pos-tranca" element={<CuidadosPage/>}/>
        <Route path="/servicos" element={<ServicosPage/>}/>
        <Route path="/sistema-clientes" element={<ClientesPage/>}/>
        <Route path="/cadastro" element={<CadastroPage/>}/>
        <Route path="/agendamentos" element={<Agendamentos/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>  
  );
}

export default App;