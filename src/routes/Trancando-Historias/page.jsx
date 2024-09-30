import { useRef, useState } from "react";
import { request } from "../../axios/request";
import Loading from "../../components/shared/Loading";
import OrderSelect from "../../components/trancando_historias/OrderSelect";
import SearchInput from "../../components/trancando_historias/SearchInput";
import BookCard from "../../components/trancando_historias/BookCard";
import Header from "../../components/shared/Header";

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

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handlerSearchBooks();
    }
  }


  return (
    <main className="p-2 pl-6 h-screen">
      <div className="flex flex-row items-center gap-5 w-[80%] m-auto ">
        <SearchInput ref={inptRef} type="text" onKeyDown={handleKeyDown}/>
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
        <div className="grid justify-items-center grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-10 pt-5  h-full">
          {books?.map((book) => (
            <BookCard book={book} key={book?.id} />
          ))}
        </div>
      )}
    </main>
  );
}
