import HeaderText from "./HeaderText";

const Menu = () => {
    return(
        <div id="menu" className="fixed top-0 left-0 hidden z-10 lg:hidden flex-col pt-28 justify-evenly text-xl text-branconeutro bg-roseprimary/95 w-full h-96 p-6 items-center">
            <HeaderText item="Trança e afeto" />
            <HeaderText item="Trançando histórias" />
            <HeaderText item="Serviços" />
            <HeaderText item="Nossa história" />
            <HeaderText item="Cuidados pós trança" />
            <span className='text-xl font-bold hover:bg-verdeprimary rounded-3xl cursor-pointer py-2 px-4'>Entrar</span>
        </div>
    )
}

export default Menu;