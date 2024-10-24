import UIProvider from "./UIProvider";
import UsuarioProvider from "./UsuarioProvider";

const GlobalProvider = ({ children }) => {
  return (
    <UsuarioProvider>
      <UIProvider>{children}</UIProvider>
    </UsuarioProvider>
  );
};
export default GlobalProvider;
