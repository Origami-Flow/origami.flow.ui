import { api } from "@/axios/request";
import { createContext, useEffect, useState } from "react";

export const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState({});

  // useEffect(() => {
  //   api.get("/usuario").then((res) => {
  //     setUsuario(res.data);
  //   });
  // }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioProvider;
