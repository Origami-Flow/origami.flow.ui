import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UIProvider from "./UIProvider";
import UsuarioProvider from "./UsuarioProvider";

const GlobalProvider = ({ children }) => {
  return (
    <>
      <UsuarioProvider>
        <UIProvider>{children}</UIProvider>
      </UsuarioProvider>
      
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        transition:Bounce
      />
    </>
  );
};
export default GlobalProvider;
