import React from "react";
import { AlertTriangleIcon } from "lucide-react";

const AlertDelete = ({ title, description, closeModal, handleDelete }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg max-md:w-[80%]">
                <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
                <div className="flex justify-evenly w-full">
                    <AlertTriangleIcon width={50} height={50} />
                    <div className="w-[80%]">
                        {description}
                    </div>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        className="bg-roseprimary text-white px-6 py-2 rounded-md" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button
                        className="bg-marromsecundary text-white px-6 py-2 rounded-md" onClick={handleDelete}>
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AlertDelete;