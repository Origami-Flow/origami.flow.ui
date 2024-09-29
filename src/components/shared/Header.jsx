import HeaderText from './HeaderText';
import iconMenu from '../../assets/icon-menu.png';
import { useState } from 'react';
import { Menu } from 'lucide-react';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)

    const menu = document.getElementById('menu');
  
    if (menu && !isMenuOpen) {
      menu.classList.toggle('hidden');
      menu.classList.add('max-md:flex');
    } else {
      menu.classList.toggle('max-md:flex');
      menu.classList.add('hidden');
    }
  }

  return (
    <div className="w-11/12 h-16 fixed flex justify-between items-center inset-0 mt-6 py-4 px-10 text-base text-branconeutro font-medium bg-verdeprimary/90 rounded-lg mx-auto">
      <span className='lg:text-2xl font-laisha select-none md:text-xl'> SALGADO TRANÇAS </span>
      <div className='w-7/12 lg:flex justify-between lg:visible md:flex-none hidden'>
        <HeaderText item="Trança e afeto" />
        <HeaderText item="Trançando histórias" />
        <HeaderText item="Serviços" />
        <HeaderText item="Nossa história" />
        <HeaderText item="Cuidados pós trança" />
      </div>
      <span className='max-lg:hidden text-lg font-bold hover:bg-roseprimary rounded-3xl cursor-pointer py-2 px-4'>Entrar</span>
      <Menu size={40}  cursor={"pointer"} onClick={toggleMenu} className=' lg:hidden' alt='Ícone menu'/>
    </div>
  );
}


export default Header;