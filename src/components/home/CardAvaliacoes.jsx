const CardAvaliacoes = ({qtdEstrelas, nome, foto, texto}) => {
  return (
    <div className="w-72 min-h-72  p-6 bg-marromsecundary flex flex-col justify-between rounded-xl text-white shadow-lg">
      <div className="flex items-center justify-between ">
        <div className="flex space-x-1">
          {Array(qtdEstrelas)
            .fill(0)
            .map((_, index) => (
              <svg
                key={index}
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.457a1 1 0 00-.364 1.118l1.286 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.457a1 1 0 00-1.175 0l-3.388 2.457c-.785.57-1.84-.197-1.54-1.118l1.286-3.974a1 1 0 00-.364-1.118L2.049 9.4c-.783-.57-.381-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
              </svg>
            ))}
        </div>
      </div>
      <p className="text-base">
        {texto}
      </p>
      <div className="flex items-center">
        <img
          src={foto}
          alt={`Foto de ${nome}`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <p className="font-bold">{nome}</p>
        </div>
      </div>
    </div>
  );
};

export default CardAvaliacoes;
