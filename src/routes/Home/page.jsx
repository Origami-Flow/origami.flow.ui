import { useEffect, useState } from "react";
import { request } from "../../axios/request";

export default function HomePage() {
  const [data, setData] = useState();
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    request
      .getCep()
      .then((resposta) => {
        console.log(resposta);
        setData(resposta);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <h1 className=" text-red-600">Olá Mundo</h1>
      <h1>{clicks}</h1>
      <button
        onClick={() => setClicks(clicks + 1)}
        className="bg-sky-700 p-2 w-20 rounded-lg text-white hover:bg-sky-800 "
      >
        + Clicks
      </button> 

      <h1>Teste de Requisição:</h1>
      {data?.cep}
    </main>
  );
}
