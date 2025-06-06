import { CircleMinus, CirclePlus, Edit2Icon } from "lucide-react";
import ModalEditar from "./ModalEditar";
import { useState } from "react";

const EstoqueCard = ({ produtoData, onPlusClick, onMinusClick }) => {
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
                src={produtoData?.produto?.imagemUrl || "https://res.cloudinary.com/dt5smeslb/image/upload/v1743895768/produtos/isjpg6jmh8tpw6shmvc5.png"}
                alt={`Produto ${produtoData?.nome || "Indefinido"}`}
                className="w-[17%] h-auto rounded-lg mr-5 object-contain"
            />
            <div className="flex flex-col w-[70%] justify-evenly">
                <span className="text-branconeutro font-bold text-lg">{produtoData?.produto.nome || "Nome não disponível"}</span>
                {/* <span className="text-branconeutro text-lg max-md:text-base">Em estoque: {produtoData?.unidades || "Unidades não disponível"}</span> */}
                <div className="flex space-x-3">
                    <CircleMinus color="#fefefe" className="cursor-pointer" onClick={onPlusClick}/>
                    <span className="text-branconeutro">{produtoData?.quantidade}</span>
                    <CirclePlus color="#fefefe" className="cursor-pointer" onClick={onMinusClick}/>
                </div>
                <div className="flex justify-end w-full cursor-pointer" onClick={openModal}>
                    <span className="text-branconeutro text-base mr-2 font-semibold">Editar</span>
                    <Edit2Icon color="#fefefe" />
                </div>
            </div>
            {isModalOpen && (<ModalEditar idProduct={produtoData?.produto.id} onClose={closeModal} nameProduct={produtoData?.produto.nome} idEstoque={produtoData.id} />)}
        </div>
    )
}

export default EstoqueCard;