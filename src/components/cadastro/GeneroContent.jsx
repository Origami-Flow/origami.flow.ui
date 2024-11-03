import CardCadastro from "./CardCadastro";

const GeneroContent = ({ value, setValue }) => {
  const handleCardClick = (text) => {
    setValue((prev) => ({ ...prev, genero: text }));
  };
  const cards = [{ text: "Homem", value: "MASCULINO" }, { text: "Mulher", value: "FEMININO" }, { text: "Outro", value: "OUTRO" }];
  return (
    <div className="flex w-[38rem] items-center justify-around">
      {cards.map((card) => (
        <CardCadastro
          key={card.text}
          text={card.text}
          selected={value.genero === card.value}
          onClick={() => handleCardClick(card.value)}
        />
      ))}
    </div>
  );
};
export default GeneroContent;
