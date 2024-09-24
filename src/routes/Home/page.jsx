import { useState } from "react";
import Header from "../../components/shared/Header";
import Menu from "../../components/shared/Menu";

export default function HomePage() {
  const [clicks, setClicks] = useState(0);

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <Header />
      <Menu />
      <h1 className=" text-red-600">Olá Mundo</h1>
      <h1>{clicks}</h1>
      <button
        onClick={() => setClicks(clicks + 1)}
        className="bg-sky-700 p-2 w-20 rounded-lg text-white hover:bg-sky-800 "
      >
        + Clicks
      </button>
    </main>
  );
}
