import { request } from "@/axios/request";
import { decryptText } from "@/utils/criptografar";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const MeusAgendamentosModal = ({ onClose, setAvaliacao }) => {
  const modalRef = useRef(null);
  const [mostrarFinalizado, setMostrarFinalizado] = useState(false);
  const [mostrarProximos, setMostrarProximos] = useState(true);
  const [mostrarAvaliar, setMostrarAvaliar] = useState(true);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const clienteId = decryptText(localStorage.getItem("id"));
    request.getAtendimentoRealizado(clienteId).then((response) => {
      setAgendamentos(response?.data || []);
      console.log(response.data);
    });
  }, []);

  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  const agendamentosFinalizados = agendamentos?.filter(
    (a) => a.statusEvento === "FINALIZADO" && a?.avaliacao != null
  );
  const agendamentosAvaliar = agendamentos?.filter(
    (a) => a.statusEvento === "FINALIZADO" && a?.avaliacao == null
  );
  const agendamentosProximos = agendamentos?.filter(
    (a) => a.statusEvento === "PROGRAMADO"
  );

  const formatDate = (dateString, fullFormat = true) => {
    const options = fullFormat
      ? {
          weekday: "long",
          month: "long",
          year: "numeric",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      : { hour: "2-digit", minute: "2-digit" };
    const date = new Date(dateString);
    return fullFormat
      ? date.toLocaleDateString("pt-BR", options)
      : date.toLocaleTimeString("pt-BR", options);
  };

  const openAvaliar = (atendimentoRealizadoId) => {
    setAvaliacao({ open: true, atendimentoRealizadoId });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-[35rem] p-6 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-lg font-bold mb-4">Meus Agendamentos</h2>

        <section className="mb-6">
          <div
            onClick={() => setMostrarProximos(!mostrarProximos)}
            className="flex justify-between cursor-pointer mb-2"
          >
            <h3 className="text-md font-semibold">Próximos</h3>
            <ChevronDown
              className={`transform transition-transform ${
                mostrarProximos ? "rotate-180" : ""
              }`}
            />
          </div>
          {mostrarProximos &&
            (agendamentosProximos.length > 0 ? (
              agendamentosProximos.map((agendamento) => (
                <div
                  key={agendamento.id}
                  className="p-2 border-b border-gray-200"
                >
                  <p className="text-sm">{agendamento.servico?.nome}</p>
                  <p className="text-xs text-gray-500">
                    Data: {formatDate(agendamento.dataHoraInicio)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum agendamento próximo.
              </p>
            ))}
        </section>

        <section className="mb-6">
          <div
            onClick={() => setMostrarAvaliar(!mostrarAvaliar)}
            className="flex justify-between cursor-pointer mb-2"
          >
            <h3 className="text-md font-semibold">Avaliar</h3>
            <ChevronDown
              className={`transform transition-transform ${
                mostrarAvaliar ? "rotate-180" : ""
              }`}
            />
          </div>
          {mostrarAvaliar &&
            (agendamentosAvaliar.length > 0 ? (
              agendamentosAvaliar.map((agendamento) => (
                <div
                  key={agendamento.id}
                  className="p-2 border-b border-gray-200 flex justify-between items-center"
                >
                  <div>
                    <p className="text-sm">{agendamento.servico?.nome}</p>
                    <p className="text-xs text-gray-500">
                      Data: {formatDate(agendamento.dataHoraInicio)}
                    </p>
                  </div>
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => openAvaliar(agendamento.id)}
                  >
                    Avaliar
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                Nenhum agendamento para avaliar.
              </p>
            ))}
        </section>

        <section>
          <div
            onClick={() => setMostrarFinalizado(!mostrarFinalizado)}
            className="flex justify-between cursor-pointer"
          >
            <h3 className="text-md font-semibold mb-2">
              Concluídos{" "}
              <span className="text-sm text-gray-500">
                ({agendamentosFinalizados.length})
              </span>
            </h3>
            <ChevronDown
              className={`transform transition-transform ${
                mostrarFinalizado ? "rotate-180" : ""
              }`}
            />
          </div>
          {mostrarFinalizado &&
            agendamentosFinalizados.map((agendamento) => (
              <div
                key={agendamento.id}
                className="p-2 border-b border-gray-200"
              >
                <p className="text-sm">{agendamento.servico?.nome}</p>
                <p className="text-xs text-gray-500">
                  Data: {formatDate(agendamento.dataHoraInicio)}
                </p>
              </div>
            ))}
        </section>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-roseprimary text-white py-2 rounded hover:opacity-90"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default MeusAgendamentosModal;
