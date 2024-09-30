import Button from "@/components/shared/Button";
import Footer from "@/components/shared/Footer/Footer";
import { OrderSelect } from "@/components/trancando_historias/OrderSelect";
import { useRef, useState } from "react";
import FormaFundo from "../../assets/FormaFundo.svg";
import Livro from "../../assets/livro_trancando_historias.svg";
import { request } from "../../axios/request";
import Header from "../../components/shared/Header";
import Loading from "../../components/shared/Loading";
import BookCard from "../../components/trancando_historias/BookCard";
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

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handlerSearchBooks();
    }
  }

  return (
    <>
      <main className="p-2 h-screen">
        <Header />
        <div className="px-4 md:w-[94%] pt-28  md:mx-auto">
          <h1 className="text-3xl md:text-6xl xl:text-white font-laisha">
            Trançando Histórias
          </h1>
          <img
            src={FormaFundo}
            className="absolute top-0 left-0 -z-10 hidden xl:block"
            alt=""
          />
          <div className="flex flex-col md:flex-row mt-8 md:mt-0">
            <img
              src={Livro}
              alt="Imagem de um Livro aberto"
              className="w-full md:w-1/2 h-auto"
            />
            <div className="py-4 text-justify flex flex-col h-auto md:h-96 justify-between mt-4 md:mt-0 md:ml-8 max-w-xl mx-auto">
              <p className="text-lg md:text-2xl">
                Aqui, conectamos leitores apaixonados, como você, criando uma
                rede de compartilhamento que vai além das estantes físicas. Com
                apenas alguns cliques, você tem acesso a uma biblioteca digital
                repleta de títulos variados — de clássicos a novos autores —
                prontos para serem baixados e apreciados. Navegue, descubra,
                troque e baixe.
              </p>
              <p className="font-bold text-xl md:text-3xl text-marromsecundary mt-4 md:mt-0">
                Sua próxima grande leitura está a um download de distância.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-16 md:mt-96 xl:mt-24 items-center gap-4 md:gap-7 w-full md:w-[90%] m-auto">
            <SearchInput
              ref={inptRef}
              className="w-80 md:w-96 bg-rosesecundary border-none  p-3"
              type="text"
              onKeyDown={handleKeyDown}
            />
            <div className="flex gap-7">
              <Button
                onClick={handlerSearchBooks}
                className="border rounded-md py-[0.15rem] bg-roseprimary text-white h-10 w-20 font-semibold  px-3"
              >
                Buscar
              </Button>
              <OrderSelect value={value} setValue={setValue} />
            </div>
          </div>

          {isLoading ? (
            <div className="h-96">
              <Loading />
            </div>
          ) : (
            <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pt-5  h-full">
              {books?.map((book) => (
                <BookCard book={book} key={book?.id} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
