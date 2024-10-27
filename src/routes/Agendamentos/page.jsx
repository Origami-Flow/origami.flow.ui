import Header from "@/components/shared/header_sistema/Header";
import { Plus } from "lucide-react";

const Agendamentos = () => {
  return (
    <main className="flex flex-col items-center justify-start relative pl-32 h-screen max-md:pl-0 max-md:pb-24 ">
      <Header />
      <div className="flex w-full justify-around">

        <div className="flex w-52 items-center gap-2">
          <h1 className="font-laisha text-2xl">Próximos agendamentos</h1>
          <div className="rounded-full p-1 bg-roseprimary">
            <Plus color="white"/>
          </div>
        </div>

        <div>
          
        </div>
      </div>
    </main>
  );
};
export default Agendamentos;
