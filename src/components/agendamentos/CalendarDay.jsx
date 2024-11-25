import { horas } from "@/utils/datas";
import React, { useEffect } from "react";
import { DatePicker } from "../ui/datePicker";
import Loading from "../shared/Loading";
import clsx from "clsx";

const CalendarDay = ({ events, setDataInicio, setDataFim, isLoading }) => {
  const today = new Date();
  const [date, setDate] = React.useState(new Date(today));

  useEffect(() => {
    setDataInicio(date);
    setDataFim(date);
  }, [date]);

  const convertHoursInNumber = (horas) => parseInt(horas.replace("h", ""));

  const calculateEventPositionAndHeight = (event, cellHeight) => {
    const startDate = new Date(event?.dataHoraInicio);
    const endDate = new Date(event?.dataHoraTermino);

    const startHour = startDate.getHours() + startDate.getMinutes() / 60;
    const endHour = endDate.getHours() + endDate.getMinutes() / 60;

    const startOffset = (startHour % 1) * cellHeight;
    const durationInHours = endHour - startHour;
    const height = durationInHours * cellHeight;

    return { top: startOffset, height };
  };

  function formatTime(date) {
    date = new Date(date);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

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
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-[0.20fr,3fr] pb-1 w-full text-center sticky top-0 bg-white z-20 border-b">
            <span></span>
            <div className="flex w-full">
              <DatePicker date={date} setDate={setDate} />
            </div>
          </div>

          <div className="grid grid-cols-[0.20fr,3fr]">
            {horas.map((hour) => (
              <React.Fragment key={hour}>
                <div className="flex border justify-end pr-2">{hour}</div>
                <div
                  key={`${hour}`}
                  className="border-t border-r h-12 relative"
                >
                  {events.map((event, eventIndex) => {
                    const startDate = new Date(event?.dataHoraInicio);
                    if (startDate.getHours() === convertHoursInNumber(hour)) {
                      const { top, height } = calculateEventPositionAndHeight(
                        event,
                        48
                      );
                      return (
                        <div
                          key={eventIndex}
                          className={clsx(
                            "border-l-8  border rounded-sm bg-[#e6e6e6a6] text-left pl-5 absolute w-full z-10 overflow-hidden",
                            event.tipoEvento === "ATENDIMENTO"
                              ? "border-l-purple-400"
                              : "border-l-roseprimary"
                          )}
                          style={{ top: `${top}px`, height: `${height}px` }}
                        >
                          <h1 className="truncate">{event?.servico?.nome}</h1>
                          <h1 className="truncate">
                            {formatTime(event?.dataHoraInicio)} -{" "}
                            {formatTime(event?.dataHoraTermino)}
                          </h1>
                          <p>
                            {event?.cliente?.nome
                              ? event?.cliente?.nome +
                                " - " +
                                formatPhoneNumber(event?.cliente?.telefone)
                              : event?.tipoEvento === "PESSOAL" && "Evento Pessoal"}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default CalendarDay;
