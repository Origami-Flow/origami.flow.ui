import TipoAgendamento from "@/components/agendamentos/TipoAgendamento";
import Button from "@/components/shared/Button";
import Header from "@/components/shared/header_sistema/Header";
import TabsFilter from "@/components/sistema_clientes/TabsFilter";
import { horas, MESES } from "@/utils/datas";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";
import { format, addDays, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Agendamentos = () => {
  const [medidaTemporal, setMedidaTemporal] = useState("Semana");
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());

  const handleMesAnterior = () => {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  };

  const handleProximoMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  };

  const tabs = [
    { text: "Semana" },
    { text: "Mês" },
    { text: "Ano" },
  ];

  const legendItems = [
    { colorClass: "bg-blue-500", label: "Pessoal" },
    { colorClass: "bg-purple-700", label: "Trabalho" },
    { colorClass: "bg-green-500", label: "Feriado" }
  ];

  const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(startDate, index);
    return {
      label: format(date, 'd EEE', { locale: ptBR }),
      isToday: date.getDate() === new Date().getDate(),
    };
  });

  return (
    <main className="flex flex-col items-center justify-start relative pl-44 h-screen max-md:pl-0 max-md:pb-24 ">
      <Header />
      <div className="flex w-[90%] pt-8 justify-between">
        <div className="flex w-52 items-center gap-2">
          <div className="h-fit flex flex-row gap-2">
            <h1 className="font-laisha h-fit text-2xl">Próximos agendamentos</h1>
            <div className="rounded-full flex self-center size-8 p-1 bg-roseprimary">
              <Plus color="white" />
            </div>
          </div>
        </div>
        <div className="flex w-full space-y-10">
          <div className="flex flex-col w-[100%] items-center justify-center">
            <div className="flex items-center gap-2">
              <Button className="hover:bg-gray-200 rounded-lg py-1" onClick={handleMesAnterior}>
                <ChevronLeft />
              </Button>
              <span className="min-w-32 flex justify-center">{MESES[mesAtual]} {anoAtual}</span>
              <Button className="hover:bg-gray-200 rounded-lg py-1" onClick={handleProximoMes}>
                <ChevronRight />
              </Button>
            </div>
            <div className="w-[80%] flex justify-center">
              <TabsFilter tabs={tabs} initialTab={1} />
            </div>
          </div>
        </div>

        <div>
          {legendItems.map((item, index) => (
            <TipoAgendamento className={item.colorClass} tipo={item.label} />
          ))}
        </div>
      </div>



      <div className=" w-[90%] p-4 mt-8 h-full max-h-full">
        <div className="grid grid-cols-8 text-center">
          <div className="col-span-1"></div> 
          {days.map((day, index) => (
            <div
              key={index}
              className={`${day.isToday ? 'bg-roseprimary text-white rounded-full ' : ''}`}
            >
              {day.label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-8">
          {horas.map((hour) => (
            <React.Fragment key={hour}>
              <div className="flex items-center border justify-end">{hour}</div>
              {days.map((_, dayIndex) => (
                <div
                  key={`${hour}-${dayIndex}`}
                  className="border-t border-r h-12"
                >

                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

    </main>
  );
};
export default Agendamentos;
