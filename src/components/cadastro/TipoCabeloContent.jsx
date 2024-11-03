import cabelo1 from "../../assets/cabelos/cabelo1.svg";
import cabelo2A from "../../assets/cabelos/cabelo2A.svg";
import cabelo2B from "../../assets/cabelos/cabelo2B.svg";
import cabelo2C from "../../assets/cabelos/cabelo2C.svg";
import cabelo3A from "../../assets/cabelos/cabelo3A.svg";
import cabelo3B from "../../assets/cabelos/cabelo3B.svg";
import cabelo3C from "../../assets/cabelos/cabelo3C.svg";
import cabelo4A from "../../assets/cabelos/cabelo4A.svg";
import cabelo4B from "../../assets/cabelos/cabelo4B.svg";
import cabelo4C from "../../assets/cabelos/cabelo4C.svg";
import CardCadastro from "./CardCadastro";

const TipoCabeloContent = ({ value, setValue }) => {
  const cards = [
    { text: "1", imagem: cabelo1, value: "A1" },
    { text: "2A", imagem: cabelo2A, value: "A2" },
    { text: "2B", imagem: cabelo2B, value: "B2" },
    { text: "2C", imagem: cabelo2C, value: "C2" },
    { text: "3A", imagem: cabelo3A, value: "A3" },
    { text: "3B", imagem: cabelo3B, value: "B3" },
    { text: "3C", imagem: cabelo3C, value: "C3" },
    { text: "4A", imagem: cabelo4A, value: "A4" },
    { text: "4B", imagem: cabelo4B, value: "B4" },
    { text: "4C", imagem: cabelo4C, value: "C4" },
  ];

  const handleCardClick = (text) => {
    setValue((prev) => ({ ...prev, tipoCabelo: text }));
  };

  return (
    <div className="grid grid-cols-3 lg:grid-cols-5  gap-10">
      {cards.map((card) => (
        <CardCadastro
          key={card.text}
          selected={value.tipoCabelo === card.value}
          onClick={() => handleCardClick(card.value)}
          className="py-2"
          text={card.text}
          imagem={card.imagem}
        />
      ))}
    </div>
  );
};
export default TipoCabeloContent;
