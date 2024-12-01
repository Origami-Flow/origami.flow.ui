import { useState } from "react";
import IconAdd from "../../assets/addIcon.svg";
import ModalAdicionarFinanca from "./ModalAdicionarFinanca";

const Dropdown = ({ options, tipoExtrato, caixaId }) => {
    const [drop, setDrop] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState(null);

    const changeDrop = () => {
        setDrop((prev) => !prev);
    };

    const handleOptionClick = (optionName) => {
        setType(optionName);
        setOpenModal(true);
        setDrop(false);
    };

    const onClose = () => {
        setOpenModal(false)
    }

    return (
        <div class="relative inline-block text-left">
            <div>
                <img src={IconAdd} className="cursor-pointer" onClick={changeDrop} />
            </div>
            {drop && (
                <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                        {options.map((item, index) => (
                            <span key={index} class="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 transition-colors cursor-pointer" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => handleOptionClick(item.name)}>{item.name}</span>
                        ))}
                    </div>
                </div>
            )}

            {openModal && (
                <ModalAdicionarFinanca onClose={onClose} tipo={tipoExtrato} subTipo={type} caixaId={caixaId}/>
            )}
        </div>

    )
}

export default Dropdown;
