import { useNavigate } from "react-router-dom";
import useUser from "./useUser";

const useLogout = () => {
  const { setUsuario } = useUser();
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setUsuario({});
    navigate("/");
  };

  return { logOut };
};

export default useLogout;
