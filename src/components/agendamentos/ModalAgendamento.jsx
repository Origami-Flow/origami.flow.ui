import { useEffect, useState } from "react";
import ComboboxAgendamento from "./ComboboxAgendamentos";
import { request } from "@/axios/request";
import { DatePicker } from "../ui/datePicker";
import { Clock, Hourglass } from "lucide-react";

const ModalAgendamento = ({ onClose }) => {
  const [clienteId, setClienteId] = useState(null);
  const [auxiliarId, setAuxiliarId] = useState(null);
  const [data, setData] = useState(new Date());
  console.log(data);

  useEffect(() => {
    console.log(clienteId);
  }, [clienteId]);

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
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-md:w-[80%]">
        <h2 className="text-xl font-bold mb-7 text-black">
          Adicionar Agendamento
        </h2>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
          <ComboboxAgendamento
            label="Nome do Cliente:"
            fetchOptions={request.getClienteNome}
            setBuscaId={setClienteId}
          />
          <ComboboxAgendamento
            label="Nome da Auxiliar:"
            fetchOptions={request.getAuxiliaNome}
            setBuscaId={setAuxiliarId}
          />
          <div className="flex flex-col">
            <label
              htmlFor="dataPicker"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Data do Agendamento:
            </label>
            <DatePicker date={data} setDate={setData} />
          </div>

          <div className="flex flex-row justify-between pr-10">
            <div>
              <label
                for="time"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Horário de início:
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="time"
                  className="border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28"
                  defaultValue={
                    String(new Date().getHours()).padStart(2, "0") +
                    ":" +
                    String(new Date().getMinutes()).padStart(2, "0")
                  }
                />
                <Clock
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label
                for="time"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Horário de Fim:
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="time"
                  className="border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 "
                  defaultValue={
                    String(new Date().getHours()).padStart(2, "0") +
                    ":" +
                    String(new Date().getMinutes()).padStart(2, "0")
                  }
                />
                <Clock
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>  
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            className="bg-roseprimary text-white px-6 py-2 rounded-md"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-marromsecundary text-white px-6 py-2 rounded-md"
            onClick={onClose}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgendamento;
