import { request } from "@/axios/request";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { DatePicker } from "../ui/datePicker";
import ComboboxAgendamento from "./ComboboxAgendamentos";

const ModalAgendamento = ({ onClose }) => {
  const [clienteId, setClienteId] = useState(null);
  const [auxiliarId, setAuxiliarId] = useState(null);
  const [data, setData] = useState(new Date());
  const [tipoEvento, setTipoEvento] = useState("pessoal");
  const [servico, setServico] = useState({});
  const [servicos, setServicos] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [inputStartTime, setInputStartTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [inputEndTime, setInputEndTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await request.getServicos();
        setServicos(response.data);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      }
    };

    fetchServicos();
  }, []);

  useEffect(() => {
    const formatDateTime = (date, time) =>
      `${date.toISOString().split("T")[0]}T${time}`;

    setStartTime(formatDateTime(data, inputStartTime));
    setEndTime(formatDateTime(data, inputEndTime));
  }, [data, inputStartTime, inputEndTime]);

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

  const handleSave = () => {
    let payload = {};
    if (tipoEvento === "PESSOAL") {
      payload = {
        tipoEvento,
        dataHoraInicio: startTime,
        dataHoraTermino: endTime,
      };
    } else {
      payload = {
        auxiliarId,
        clienteId,
        tipoEvento,
        servicoId: servico,
        dataHoraInicio: startTime,
        dataHoraTermino: endTime,
        trancistaId: 1,
      };
    }
    console.log(payload)
    request.postEvento(payload).then(() => {
      
      onClose();
    })
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-md:w-[80%]">
        <h2 className="text-xl font-bold mb-7 text-black">
          Adicionar Agendamento
        </h2>

        <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
          <div className="flex flex-col col-span-2">
            <label
              htmlFor="tipoEvento"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Tipo de Evento:
            </label>
            <select
              id="tipoEvento"
              className="border border-gray-300 w-64 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
              value={tipoEvento}
              onChange={(e) => setTipoEvento(e.target.value)}
            >
              <option value="PESSOAL">Evento Pessoal</option>
              <option value="ATENDIMENTO">Atendimento</option>
            </select>

            {tipoEvento === "ATENDIMENTO" && (
              <>
                <label
                  htmlFor="servico"
                  className="mb-2 text-sm pt-2 font-medium text-gray-700"
                >
                  Serviço:
                </label>

                <select
                  id="servico"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg w-[93%] focus:ring-blue-500 focus:border-blue-500 p-2.5"
                  onChange={(e) => setServico(e.target.value)}
                >
                  <option value="">Selecione um serviço</option>
                  {servicos?.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>

          {tipoEvento === "ATENDIMENTO" && (
            <>
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
            </>
          )}

          <div className="flex flex-col">
            <label
              htmlFor="dataPicker"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Data do Agendamento:
            </label>
            <DatePicker date={data} setDate={setData} />
          </div>

          <div className="flex flex-row justify-between pr-12">
            <div>
              <label
                htmlFor="timeStart"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Horário de início:
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="timeStart"
                  className="border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28"
                  value={inputStartTime}
                  onChange={(e) => setInputStartTime(e.target.value)}
                />
                <Clock
                  size={16}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="timeEnd"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Horário de Fim:
              </label>
              <div className="relative">
                <input
                  type="time"
                  id="timeEnd"
                  className="border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 "
                  value={inputEndTime}
                  onChange={(e) => setInputEndTime(e.target.value)}
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
            onClick={handleSave}
          >
            Criar Agendamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalAgendamento;
