import { Check, Edit, Trash, X } from "lucide-react";
import { useEffect, useRef, useCallback } from "react";
import Tooltip from "../shared/Tooltip";

const EventModal = ({ onClose, editModal }) => {
  const modalRef = useRef(null);
  const event = editModal?.event;
  console.log(event);

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-80 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {event?.tipoEvento === "PESSOAL" ? "Evento" : event?.servico}
          </h2>
          <div className="flex w-28 justify-evenly">
            <Tooltip text="Concluir">
              <Check
                onClick={() => console.log(event.id)}
                className="cursor-pointer size-5 text-gray-600 stroke-[3] hover:text-green-600"
              />
            </Tooltip>
            <Tooltip text="Editar">
              <Edit
                onClick={() => console.log(event.id)}
                className="cursor-pointer size-5 text-gray-600 hover:text-blue-500"
              />
            </Tooltip>
            <Tooltip text="Excluir">
              <Trash
                onClick={() => console.log(event.id)}
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
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
          Copiar Lembrete
        </button>
        <div className="mt-4 text-sm text-gray-700">
          {event?.cliente && (
              <p>{event.cliente}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;
