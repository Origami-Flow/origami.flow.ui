import { request } from "@/axios/request";
import CalendarControls from "@/components/agendamentos/CalendarControls";
import CalendarDay from "@/components/agendamentos/CalendarDay";
import CalendarGrid from "@/components/agendamentos/CalendarGrid";
import { CalendarMonth } from "@/components/agendamentos/CalendarMonth";
import Legend from "@/components/agendamentos/Legend";
import ModalAgendamento from "@/components/agendamentos/ModalAgendamento";
import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Agendamentos = () => {
  const [medidaTemporal, setMedidaTemporal] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataInicio, setDataInicio] = useState(new Date());
  const [dataFim, setDataFim] = useState(new Date());
  const tabs = [{ text: "Dia" }, { text: "Semana" }, { text: "Mês" }];
  const containerRef = useRef(null);

  const translateToLocalDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  const fetchEvents = async () => {
    request
      .getEventosData(
        translateToLocalDate(dataInicio),
        translateToLocalDate(dataFim)
      )
      .then((response) => {
        setEvents(response.data);
      })
      .finally(() => {
        setIsLoading(false);
        if (containerRef.current) {
          containerRef.current.scrollTop = 336;
        }
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetchEvents();
  }, [dataInicio, dataFim, medidaTemporal]);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-start relative pl-36 h-screen max-md:pl-0 max-md:pb-24">
        <HeaderSistema />
        <div className="flex w-[90%] pt-8 justify-between">
          <div className="flex items-center">
            <h1 className="font-laisha text-2xl">Próximos agendamentos</h1>
            <div
              className="rounded-full p-1 h-fit bg-roseprimary cursor-pointer"
              onClick={openModal}
            >
              <Plus color="white" />
            </div>
          </div>
          <CalendarControls tabs={tabs} setMedidaTemporal={setMedidaTemporal} />
          <Legend />
        </div>
        {medidaTemporal === "Dia" && (
          <div
            className="w-[100%] px-4 mt-8 max-h-[73%] overflow-auto"
            ref={containerRef}
          >
            <CalendarDay
              events={events}
              setDataInicio={setDataInicio}
              setDataFim={setDataFim}
              isLoading={isLoading}
            />
          </div>
        )}

        {medidaTemporal === "Semana" && (
          <div
            className="w-[100%] px-4 mt-8 max-h-[73%] overflow-auto"
            ref={containerRef}
          >
            <CalendarGrid
              events={events}
              setDataInicio={setDataInicio}
              setDataFim={setDataFim}
              isLoading={isLoading}
            />
          </div>
        )}
        {medidaTemporal === "Mês" && (
          <div className="w-[100%] px-4 h-[84%]">
            <CalendarMonth
              events={events}
              setDataInicio={setDataInicio}
              setDataFim={setDataFim}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>
      {isOpen && (
        <ModalAgendamento
          onClose={() => setIsOpen(false)}
          fetchEvents={fetchEvents}
        />
      )}
    </>
  );
};

export default Agendamentos;
