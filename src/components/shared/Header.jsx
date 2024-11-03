import { Calendar, LogOut, Menu as MenuIcon, Pencil, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import HeaderText from "./HeaderText";
import Menu from "./Menu";
import useUser from "@/hooks/useUser";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { usuario, setUsuario } = useUser();
  const [nomeUsuario, setNomeUsuario] = useState();
  const userMenuRef = useRef(null);

  useEffect(() => {
    if (usuario?.nome) {
      const nomeArray = usuario.nome.split(" ");
      if (nomeArray.length > 1) {
        setNomeUsuario(`${nomeArray[0]} ${nomeArray[1][0]}.`);
      } else {
        setNomeUsuario(nomeArray[0]);
      }
    }
  }, [usuario]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    const menu = document.getElementById("menu");

    if (menu && !isMenuOpen) {
      menu.classList.toggle("hidden");
      menu.classList.add("max-md:flex");
    } else {
      menu.classList.toggle("max-md:flex");
      menu.classList.add("hidden");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setUsuario({});
    window.location.reload();
  }
  return (
    <>
      <div className="w-11/12 h-16 z-30 fixed flex justify-between  items-center inset-0 mt-6 py-4 px-10 text-base text-branconeutro font-medium bg-verdeprimary/90 rounded-lg mx-auto">
        <span className="lg:text-2xl font-laisha select-none md:text-xl">
          <HeaderText item="SALGADO TRANÇAS" path="/" />
        </span>
        <div className="w-7/12 lg:flex justify-between lg:visible md:flex-none hidden">
          <HeaderText item="Trança e afeto" path="/tranca-e-afeto" />
          <HeaderText item="Trançando histórias" path="/trancando-historias" />
          <HeaderText item="Serviços" path="/servicos" />
          <HeaderText item="Nossa história" path="/nossa-historia" />
          <HeaderText item="Cuidados pós trança" path="/cuidados-pos-tranca" />
        </div>

        {usuario?.nome ? (
          <div className="relative" ref={userMenuRef}>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <div className="size-8 bg-white rounded-full">
                <UserRound className="size-full p-[0.20rem] text-black" />
              </div>
              {nomeUsuario}
            </div>
            {isUserMenuOpen && (
              <div className="absolute flex flex-col gap-2 top-11 -right-10 mt-2 shadow-2xl w-[250px] text-white bg-verdeprimary/90 rounded-md p-[0.30rem]">
                <span className="flex gap-4 hover:bg-[#3e591e] p-2 rounded-sm cursor-pointer">
                  <Pencil />
                  <p>Editar meu perfil</p>
                </span>
                <span className="flex gap-4 hover:bg-[#3e591e] p-2 rounded-sm cursor-pointer">
                  <Calendar />
                  <p>Meus Agendamentos</p>
                </span>
                <span onClick={logOut} className="flex gap-4 hover:bg-[#3e591e] p-2 rounded-sm cursor-pointer">
                  <LogOut />
                  <p>Sair</p>
                </span>
              </div>
            )}
          </div>
        ) : (
          <span className="max-lg:hidden text-lg font-bold hover:bg-roseprimary rounded-3xl cursor-pointer py-2 px-4">
            <HeaderText item="Entrar" path="/login" />
          </span>
        )}
        
        <MenuIcon
          size={40}
          cursor={"pointer"}
          onClick={toggleMenu}
          className="lg:hidden"
          alt="Ícone menu"
        />
      </div>
      <Menu />
    </>
  );
};

export default Header;
