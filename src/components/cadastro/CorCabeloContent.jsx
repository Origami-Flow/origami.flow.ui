import CardCadastro from "./CardCadastro";

const CorCabeloContent = ({ value, setValue }) => {
  const cards = [
    { text: "Branco" },
    { text: "Loiro" },
    { text: "Ruivo" },
    { text: "Preto" },
    { text: "Castanho" },
    { text: "Grisalho" },
    { text: "Outro" },
  ];

  const handleCardClick = (text) => {
    setValue((prev) => ({ ...prev, corDoCabelo: text }));
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap w-8/12 justify-center gap-8">
        {cards.map((card) => (
          <CardCadastro
            key={card.text}
            text={card.text}
            selected={value.corDoCabelo === card.text}
            onClick={() => handleCardClick(card.text)}
          />
        ))}
      </div>
    </div>
  );
};

export default CorCabeloContent;
