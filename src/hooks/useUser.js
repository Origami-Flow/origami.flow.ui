import { UsuarioContext } from "@/providers/UsuarioProvider";
import { useContext } from "react";

const useUser = () => {
  return useContext(UsuarioContext);
};

export default useUser;
