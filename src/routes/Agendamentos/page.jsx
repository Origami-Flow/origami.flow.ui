import Header from "@/components/shared/header_sistema/Header";
import CalendarControls from "@/components/agendamentos/CalendarControls";
import CalendarGrid from "@/components/agendamentos/CalendarGrid";
import Legend from "@/components/agendamentos/Legend";
import { useEffect, useRef, useState } from "react";
import { CalendarMonth } from "@/components/agendamentos/CalendarMonth";
import CalendarDay from "@/components/agendamentos/CalendarDay";
import { Plus } from "lucide-react";
import ModalAgendamento from "@/components/agendamentos/ModalAgendamento";

const Agendamentos = () => {
  const [medidaTemporal, setMedidaTemporal] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const tabs = [{ text: "Dia" }, { text: "Semana" }, { text: "Mês" }]; 
  const containerRef = useRef(null);

  const events = [
    {
      title: "Reunião",
      start: new Date("2024-11-18T08:00:00"),
      end: new Date("2024-11-18T12:00:00"),
    },
    {
      title: "Almoço",
      start: new Date("2024-11-18T17:30:00"),
      end: new Date("2024-11-18T18:30:00"),
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 336;
    }
  }, [medidaTemporal]);

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <>
      <main className="flex flex-col items-center justify-start relative pl-36 h-screen max-md:pl-0 max-md:pb-24">
        <Header />
        <div className="flex w-[90%] pt-8 justify-between">
          <div className="flex items-center">
            <h1 className="font-laisha text-2xl">Próximos agendamentos</h1>
            <div className="rounded-full p-1 h-fit bg-roseprimary cursor-pointer" onClick={openModal}>
              <Plus color="white" />
            </div>
          </div>
          <CalendarControls
            tabs={tabs}
            setMedidaTemporal={setMedidaTemporal}
          />
          <Legend />
        </div>
        {medidaTemporal === "Dia" && (
          <div className="w-[100%] px-4 mt-8 max-h-[73%] overflow-auto"  ref={containerRef}>
            <CalendarDay events={events} />
          </div>
        )}

        {medidaTemporal === "Semana" && (
          <div className="w-[100%] px-4 mt-8 max-h-[73%] overflow-auto" ref={containerRef}>
            <CalendarGrid events={events} />
          </div>
        )}
        {medidaTemporal === "Mês" && (
          <div className="w-[100%] px-4 h-[84%]" >
            <CalendarMonth />
          </div>
        )}
      </main>
      {isOpen && (<ModalAgendamento onClose={() => setIsOpen(false)} />)}
    </>
  );
};

export default Agendamentos;
