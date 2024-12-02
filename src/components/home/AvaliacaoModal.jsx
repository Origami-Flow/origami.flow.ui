import { useCallback, useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { request } from "@/axios/request";
import { decryptText } from "@/utils/criptografar";

const AvaliacaoModal = ({
  onClose,
  openAgendamentos,
  atendimentoRealizadoId,
}) => {
  const modalRef = useRef(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    console.log(atendimentoRealizadoId);
  }, [atendimentoRealizadoId]);
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

  const handleRatingClick = (index) => {
    setRating(index);
  };

  const handleMouseEnter = (index) => {
    setHoveredRating(index);
  };

  const handleMouseLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = () => {
    const clienteId = decryptText(localStorage.getItem("id"));
    request
      .postAvaliacaoUsuario({
        nota: rating,
        comentario: feedback,
        salaoId: 1,
        clienteId,
        atendimentoRealizadoId,
      })
      .then(() => {
        onClose();
      });
  };

  const handleCloseAgendamento = () => {
    openAgendamentos();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg w-[35rem] p-6 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-lg font-bold mb-4">Avaliação</h2>

        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <Star
              key={index}
              className={`h-8 w-8 cursor-pointer ${
                (hoveredRating || rating) >= index
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
              onClick={() => handleRatingClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>

        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          rows="4"
          placeholder="Escreva sua avaliação aqui..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
            onClick={handleCloseAgendamento}
          >
            Cancelar
          </button>
          <button
            className="bg-verdeprimary text-white py-2 px-4 rounded hover:bg-opacity-95"
            onClick={handleSubmit}
            disabled={rating === 0 || feedback.trim() === ""}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvaliacaoModal;
