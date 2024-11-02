import { Menu as MenuIcon } from "lucide-react";
import { useState } from "react";
import HeaderText from "./HeaderText";
import Menu from "./Menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <span className="max-lg:hidden text-lg font-bold hover:bg-roseprimary rounded-3xl cursor-pointer py-2 px-4">
          <HeaderText item="Entrar" path="/login" />
        </span>
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
