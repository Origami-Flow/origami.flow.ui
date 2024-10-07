import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./routes/Home/page";
import Login from "./routes/Login/Login";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;