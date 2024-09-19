import '../../src/index.css';

function Header() {
  return (
    <div className="w-11/12 h-16 fixed flex justify-between items-center inset-0 mt-6 py-4 px-10 text-base text-branconeutro font-medium bg-verdeprimary/90 rounded-xl mx-auto">
      <span className='text-2xl font-laisha select-none'> SALGADO TRANÇAS </span>
      <div className='w-7/12 flex justify-between'>
        <HeaderText item="Trança e afeto" />
        <HeaderText item="Trançando histórias" />
        <HeaderText item="Serviços" />
        <HeaderText item="Nossa história" />
        <HeaderText item="Cuidados pós trança" />
      </div>
      <span className='text-lg font-bold hover:bg-roseprimary rounded-3xl cursor-pointer py-2 px-4'>Entrar</span>
    </div>
  );
}

function HeaderText(props){
  return(
    <ul className="flex space-x-3 items-center hover:text-rosesecundary cursor-pointer">
      {props.item}
    </ul>
  )
}


export default Header;