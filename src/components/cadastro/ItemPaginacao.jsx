import { clsx } from "clsx";

const ItemPaginacao = ({ pagina, atual, onClick}) => {
  return (
    <div onClick={onClick} className={clsx("h-5 w-5 rounded-full cursor-pointer transition-colors ",
         pagina == atual ? "bg-roseprimary": "bg-rosesecundary hover:opacity-70 hover:bg-roseprimary")} />
  );
};
export default ItemPaginacao;