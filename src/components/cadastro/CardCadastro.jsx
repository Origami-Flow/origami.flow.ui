import clsx from "clsx";

const CardCadastro = ({ className, text, onClick, selected, imagem }) => {
  return (
    <>
      <div
        onClick={onClick}
        className={clsx(
          "flex flex-col items-center h-44 justify-between rounded-2xl transition-transform duration-300 hover:scale-110",
          className,
          selected && "transform scale-110 drop-shadow-lg"
        )}
      >
        <div className={clsx("bg-marromsecundary cursor-pointer flex items-center justify-center w-32 h-32 rounded-xl transition-transform duration-300", selected && "transform bg-roseprimary")}>
          {imagem && <img src={imagem} alt="" className="h-24 w-24 rounded-xl" />}
        </div>
        <p className="cursor-pointer">{text}</p>
      </div>
    </>
  );
};

export default CardCadastro;
