import { format, addDays, startOfWeek } from "date-fns";
import { ptBR } from "date-fns/locale";
import { horas } from "@/utils/datas";
import React, { useEffect } from "react";
import clsx from "clsx";

const CalendarGrid = ({ events, setDataInicio, setDataFim, isLoading, setEditModal }) => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });
  useEffect(() => {
    setDataInicio(startDate);
    setDataFim(addDays(startDate, 6));
  }, []);

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(startDate, index);
    return {
      label: format(date, "d EEE", { locale: ptBR }),
      isToday: date.getDate() === new Date().getDate(),
    };
  });


  function formatTime(date) {
    date = new Date(date);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  const clearDays = days.map((day) => day.label.replace(/[^0-9]+/g, ""));

  const convertHoursInNumber = (horas) => parseInt(horas.replace("h", ""));

  const calculateEventPositionAndHeight = (event, cellHeight) => {
    const hourStart = new Date(event?.dataHoraInicio);
    const hourEnd = new Date(event?.dataHoraTermino);
    const startHour = hourStart.getHours() + hourStart.getMinutes() / 60;
    const endHour = hourEnd.getHours() + hourEnd.getMinutes() / 60;

    const startOffset = (startHour % 1) * cellHeight;
    const durationInHours = endHour - startHour;
    const height = durationInHours * cellHeight;

    return { top: startOffset, height };
  };
  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";

    const cleaned = ("" + phoneNumber).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  return (
    <div>
      <div className="grid grid-cols-8 pb-1 text-center sticky top-0 bg-white z-20 border-b">
        <div className="col-span-1"></div>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${
              day.isToday ? "bg-roseprimary text-white rounded-full" : ""
            }`}
          >
            {day.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        {horas.map((hour) => (
          <React.Fragment key={hour}>
            <div className="flex border justify-end pr-2">{hour}</div>
            {clearDays.map((day, dayIndex) => (
              <div
                key={`${hour}-${dayIndex}`}
                className="border-t border-r h-12 relative"
              >
                {events?.map((event, eventIndex) => {
                  const startDate = new Date(event?.dataHoraInicio);
                  if (
                    startDate.getDate() === parseInt(day) &&
                    startDate.getHours() === convertHoursInNumber(hour)
                  ) {
                    const { top, height } = calculateEventPositionAndHeight(
                      event,
                      48
                    );
                    return (
                      <div
                        key={eventIndex}
                        className={clsx(
                          "border-l-8  border rounded-sm text-center bg-[#e6e6e6a6] absolute w-full z-10 overflow-hidden cursor-pointer",
                          event.tipoEvento === "ATENDIMENTO"
                            ? "border-l-purple-400"
                            : "border-l-roseprimary"
                        )}
                        onClick={() => setEditModal({event, open: true})}
                        style={{ top: `${top}px`, height: `${height}px` }}
                      >
                        <h1 className="truncate">{event?.servico?.nome}</h1>
                        
                        <p className="truncate ">
                          {event?.cliente?.nome
                            ? event?.cliente?.nome 
                            : event?.tipoEvento === "PESSOAL" &&
                              "Evento Pessoal"}
                        </p>
                        <p className="truncate">{formatPhoneNumber(event?.cliente?.telefone)}</p>
                        <h1 className="truncate">
                          {formatTime(event?.dataHoraInicio)} -{" "}
                          {formatTime(event?.dataHoraTermino)}
                        </h1>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
