import { formatPhoneNumber } from "@/utils/formatar";
import { Check, Edit, Mail, Phone, Trash, UserCircle2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import WhatsApp from "../../assets/WhatsApp.svg.png";
import Tooltip from "../shared/Tooltip";
import { request } from "@/axios/request";
import { toast } from "react-toastify";

const EventModal = ({ onClose, editModal, setModalOpen, fetchEvents }) => {
  const [alertaVisivel, setAlertaVisivel] = useState(false);

  const modalRef = useRef(null);
  const event = editModal?.event;

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

  const formatDate = (dateString, fullFormat = true) => {
    const options = fullFormat
      ? {
          weekday: "long",
          month: "long",
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  const copiarMensagemLembrete = () => {
    const lembrete = `Olá ${event.cliente.nome}! Tudo bem?🌟
Seu agendamento para ${event.servico.nome} está marcado para ${formatDate(
      event.dataHoraInicio
    )} - ${formatDate(event.dataHoraTermino, false)} 
Gostaria de confirmar? ✨`;
    navigator.clipboard.writeText(lembrete);

    setAlertaVisivel(true);
    setTimeout(() => {
      setAlertaVisivel(false);
    }, 1500);
  };

  const triggerModal = (modal) => {
    setModalOpen({ modal, event });
    onClose();
  };

  const finalizarAgendamento = () => {
    request.putFinalizarEvento(event.id, []).then(() => {
      toast.success("Agendamento finalizado com sucesso!");
      fetchEvents();
      onClose();
    }).catch(() => {
      toast.error("Erro ao finalizar agendamento!");
    });
  };

  const removerEvento = (id) => {
    request.deleteEvento(id).then(() => {
      toast.success("Evento removido com sucesso!");
      fetchEvents();
      onClose();
    }).catch(() => {
      toast.error("Erro ao remover evento!");
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-80 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {event?.tipoEvento === "PESSOAL" ? "Evento" : event?.servico?.nome}
          </h2>
          <div className="flex w-28 justify-evenly">
            <Tooltip text="Concluir">
              <Check
                onClick={() => {
                  event?.tipoEvento === "ATENDIMENTO"
                    ? triggerModal("COMPLETAR")
                    : finalizarAgendamento();
                }}
                className="cursor-pointer size-5 text-gray-600 stroke-[3] hover:text-green-600"
              />
            </Tooltip>
            <Tooltip text="Editar">
              <Edit
                onClick={() => {
                  triggerModal("EDITAR");
                }}
                className="cursor-pointer size-5 text-gray-600 hover:text-blue-500"
              />
            </Tooltip>
            <Tooltip text="Excluir">
              <Trash
                onClick={() => removerEvento(event.id)}
                className="cursor-pointer size-5 text-gray-600 hover:text-red-500"
              />
            </Tooltip>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-700">
          {formatDate(event?.dataHoraInicio)} -{" "}
          {formatDate(event?.dataHoraTermino, false)}
        </p>
        <button
          onClick={() => copiarMensagemLembrete()}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Copiar Lembrete
        </button>
        <div className="mt-4 text-xs text-gray-700 flex flex-col gap-1">
          {event?.cliente && (
            <div className="flex justify-between items-center">
              <div>
                <div className="flex gap-1 w-full items-center">
                  <UserCircle2 className="size-3" />
                  <p>{event.cliente?.nome}</p>
                </div>
                <div className="flex gap-1 w-full items-center">
                  <Mail className="size-3" />
                  <p>{event.cliente?.email}</p>
                </div>
                <div className="flex gap-1 w-full items-center">
                  <Phone className="size-3" />
                  <p>{formatPhoneNumber(event.cliente?.telefone)}</p>
                </div>
              </div>
              <img
                className="h-10 cursor-pointer"
                onClick={() =>
                  window.open(
                    `https://wa.me/${event?.cliente?.telefone}`,
                    "_blank"
                  )
                }
                src={WhatsApp}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      {alertaVisivel && (
        <div className="absolute bottom-0 transform left-1/2 flex gap-2 items-center -translate-x-1/2 mb-2 bg-white border border-gray-300 text-black  text-sm px-3 py-1 rounded shadow-xl animate-fade-out">
          <Check className="text-green-600 size-5" />
          Lembrete copiado!
        </div>
      )}
    </div>
  );
};

export default EventModal;
