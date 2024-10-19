import { CirclePlus, Edit2Icon } from "lucide-react";
import ModalEditar from "./ModalEditar";
import { useState } from "react";

const EstoqueCard = ({ produtoData }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="bg-roseprimary w-full p-5 rounded-lg flex max-h-[150px] max-md:max-h-[150px]">
            <img
                src={produtoData.foto}
                alt={`Produto ${produtoData.nome || "Indefinido"}`}
                className="w-[30%] h-auto rounded-lg mr-5"
            />
            <div className="flex flex-col w-[70%] justify-evenly">
                <span className="text-branconeutro font-bold text-lg">{produtoData.nome || "Nome não disponível"}</span>
                <span className="text-branconeutro text-lg max-md:text-base">Em estoque: {produtoData.unidades || "Unidades não disponível"}</span>
                <div className="space-y-2">
                    <div className="flex justify-end w-full cursor-pointer" onClick={openModal}>
                        <span className="text-branconeutro text-base mr-2 font-semibold">Editar </span>
                        <Edit2Icon color="#fefefe" />
                    </div>
                    <div className="flex justify-end w-full cursor-pointer">
                        <span className="text-branconeutro text-base mr-2 font-semibold">Adicionar </span>
                        <CirclePlus color="#fefefe" />
                    </div>
                </div>
            </div>
            {isModalOpen && (<ModalEditar onClose={closeModal} nameProduct={produtoData.nome}/>)}
        </div>
    )
}

export default EstoqueCard;