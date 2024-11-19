import HeaderText from "./HeaderText";
import IconAgenda from "../../../assets/icon-agenda.svg";
import IconLogout from "../../../assets/icon-logout.svg"
import IconFinancas from "../../../assets/icon-financas.svg"
import IconMetricas from "../../../assets/icon-metricas.svg"
import IconEstoque from "../../../assets/icon-estoque.svg"
import IconClientes from "../../../assets/icon-clientes.svg"

const Header = () => {
  return (
    <>
      <div className="w-[8%] h-11/12 z-20 fixed flex flex-col justify-between items-center inset-0 py-10 text-base text-branconeutro font-medium bg-verdeprimary/90 rounded-3xl my-2 ml-4 max-md:mt-auto max-md:mb-4 max-md:ml-0 max-md:w-full max-md:h-[10%] max-md:flex-row max-md:bottom-0 max-md:py-3 max-md:justify-evenly">
        <span className="text-xl max-md:text-sm max-lg:text-sm font-laisha select-none text-rosesecundary text-center px-5 max-md:hidden">
          SALGADO 
          TRANÇAS
        </span>
        <div className="w-full h-[80%] flex flex-col justify-evenly max-md:items-center max-md:flex-row max-md:w-full max-md:h-full">
            <HeaderText icon={IconAgenda} item="Agenda" path="/" visibilidade="flex"/>
            <HeaderText icon={IconFinancas} item="Finanças" path="/" visibilidade="flex"/>
            <HeaderText icon={IconMetricas} item="Métricas" path="/" visibilidade="flex"/>
            <HeaderText icon={IconEstoque} item="Estoque" path="/" visibilidade="flex" />
            <HeaderText icon={IconClientes} item="Clientes" path="/sistema-clientes" visibilidade="flex"/>
            <HeaderText icon={IconLogout} item="Sair" path="/" visibilidade="hidden max-md:flex" />
        </div>
        <img src={IconLogout} alt="Icone logout" className="w-[30%] max-md:hidden cursor-pointer"/>
      </div>
    </>
  );
};

export default Header;