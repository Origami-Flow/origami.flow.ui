import { useState } from "react";
import ClientModal from "./ClientModal";

const ClientCard = ({ clientData }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <div className="flex items-center justify-between bg-roseprimary text-white rounded-lg p-5 mb-4 max-md:p-3">
            <div className="flex items-center">
                <img
                    src={clientData?.foto}
                    alt="Foto do Cliente"
                    className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                    <h3 className="text-lg font-semibold max-md:text-base">{clientData?.nome || "N/A"}</h3>
                    <p className="text-sm max-md:text-xs">{clientData?.email || "N/A"}</p>
                </div>
            </div>
            <div className="flex items-center">
                <button className="bg-white text-roseprimary px-4 py-2 rounded-md max-md:px-1 max-md:py-1 max-md:text-xs">
                    Próximo agendamento
                </button>
                <span className="text-2xl ml-4 cursor-pointer" onClick={openModal}>&gt;</span>
            </div>
            {isModalOpen && (<ClientModal onClose={closeModal} clientData={clientData} />)}
        </div>
    )
}

export default ClientCard;