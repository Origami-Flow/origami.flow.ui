import { Link } from "react-router-dom";
import HeaderText from "./HeaderText";

const Menu = () => {
    return(
        <div id="menu" className="fixed top-0 left-0 hidden z-20 lg:hidden flex-col pt-28 justify-evenly text-xl text-branconeutro bg-roseprimary/95 w-full h-96 p-6 items-center">
            <HeaderText item="Trança e afeto" path="/tranca-e-afeto" />
            <HeaderText item="Trançando histórias" path="/trancando-historias" />
            <HeaderText item="Serviços" path="/servicos" />
            <HeaderText item="Nossa história" path="/nossa-historia" />
            <HeaderText item="Cuidados pós trança" path="/cuidados-pos-tranca" />
            <Link className='text-xl font-bold hover:bg-verdeprimary rounded-3xl cursor-pointer py-2 px-4' to="/login" >Entrar</Link>
        </div>
    )
}

export default Menu;