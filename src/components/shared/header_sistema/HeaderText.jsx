import { Link, useLocation } from 'react-router-dom';

const HeaderText = ({ item, icon, path, visibilidade }) => {
    const location = useLocation(); 

    return (
        <Link to={path}>
            <div 
                className={`${visibilidade} flex-col items-center cursor-pointer transition-all ease-in-out p-2 space-y-2 max-md:border-none ${
                    location.pathname === path ? 'border-r-[5px] border-r-roseprimary' : 'hover:border-r-[5px] hover:border-r-roseprimary'
                }`}
            >
                <img src={icon} alt="icone" className="w-[40%] max-lg:w-[30%] max-md:w-[6vw]" />
                <span className="text-sm max-md:text-xs max-lg:text-xs text-rosesecundary max-md:hidden">
                    {item}
                </span>
            </div>
        </Link>
    );
};

export default HeaderText;