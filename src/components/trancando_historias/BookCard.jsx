import clsx from "clsx";
import { BookText, FileDown } from "lucide-react";
import Button from "../shared/Button";

export default function BookCard({ book, className, ...rest }) {
  const redirecionar = (link) => {
    window.open(link, "_blank");
  }
  return (
    <div
      className={clsx(
        "flex items-center p-3 rounded-lg w-96 justify-around h-60 shadow-md hover:shadow-lg  transition-shadow",
        className
      )}
      {...rest}
    >
      <img
        className="w-40 h-52 object-cover rounded-lg"
        src={book?.thumbnail}
        alt={book?.title}
      />
      <div className="flex flex-col h-full py-1 justify-between">
        <span className="text-center line-clamp-2">{book?.title}</span>
        <div className="flex flex-col w-full items-center h-1/3 justify-between">

          {book?.previewLink && (
            <Button onClick={() => redirecionar(book?.previewLink)} className="bg-roseprimary text-white w-32 gap-2 font-semibold h-8">
              <BookText />
              Ler Online
            </Button>
          )}
          {book?.downloadLink && (
            <Button onClick={() => redirecionar(book?.downloadLink)} className="bg-marromsecundary text-white w-32 gap-2 font-semibold h-8">
              <FileDown />
              Baixar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
