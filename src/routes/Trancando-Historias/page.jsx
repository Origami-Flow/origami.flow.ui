import { useRef, useState } from "react";
import { request } from "../../axios/request";
import Loading from "../../components/shared/Loading";
import OrderSelect from "../../components/trancando_historias/OrderSelect";
import SearchInput from "../../components/trancando_historias/SearchInput";

export default function HistoriasPage() {
  const inptRef = useRef();
  const [value, setValue] = useState("none");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handlerSearchBooks() {
    const queryParams = {
      title: inptRef.current.value,
      order: value,
    };
    setIsLoading(true);
    request
      .getBooks(queryParams)
      .then((resp) => {
        setBooks(resp?.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main className="p-2 h-screen">
      <div className=" pl-4 flex flex-row items-center gap-5">
        <SearchInput ref={inptRef} type="text" />
        <button
          onClick={handlerSearchBooks}
          className="border rounded-md py-[0.15rem] border-gray-300 px-3"
        >
          Enviar
        </button>
        <OrderSelect value={value} setValue={setValue} />
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-3 gap-10 pt-5 w-full h-full">
          {books?.map((book) => (
          <div key={book?.id} className="flex flex-col items-center">
            <img
              className="w-40 h-40 object-cover rounded-lg"
              src={book?.thumbnail}
              alt={book?.title}
            />
            <span className="text-center">{book?.title}</span>
            <div>{book?.authors}</div>
          </div>
          ))}
        </div>
      )}
    </main>
  );
}
