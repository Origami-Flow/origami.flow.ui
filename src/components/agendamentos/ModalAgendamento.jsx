import { useEffect, useState } from "react";
import InputFormulario from "../shared/InputFormulario";
import { ComboboxAgendamentos } from "./ComboboxAgendamentos";

const ModalAgendamento = ({ onClose, }) => {
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [column, setColumn] = useState("");

    const handleChange = (value, type) => {
        if (value !== "" && type == "select") {
            setIsOptionDisabled(true);
        }
    };
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        addEventListener("keydown", handleKeyDown);
        return () => {
            removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose])

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-md:w-[80%]">
                <h2 className="text-xl font-bold mb-7 text-black">Adicionar Agendamento</h2>

                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                    <ComboboxAgendamentos></ComboboxAgendamentos>
                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        className="bg-roseprimary text-white px-6 py-2 rounded-md"
                        onClick={onClose}>
                        Cancelar
                    </button>
                    <button
                        className="bg-marromsecundary text-white px-6 py-2 rounded-md"
                        onClick={onClose}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalAgendamento;