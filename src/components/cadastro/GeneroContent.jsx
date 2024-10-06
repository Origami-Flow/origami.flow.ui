import CardCadastro from "./CardCadastro";

const GeneroContent = ({ value, setValue }) => {
  const handleCardClick = (text) => {
    setValue((prev) => ({ ...prev, genero: text }));
  };
  const cards = [{ text: "Homem" }, { text: "Mulher" }, { text: "Outro" }];
  return (
    <div className="flex w-[38rem] items-center justify-around">
      {cards.map((card) => (
        <CardCadastro
          key={card.text}
          text={card.text}
          selected={value.genero === card.text}
          onClick={() => handleCardClick(card.text)}
        />
      ))}
    </div>
  );
};
export default GeneroContent;
