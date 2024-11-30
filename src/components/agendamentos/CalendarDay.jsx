import { horas } from "@/utils/datas";
import React, { useEffect } from "react";
import { DatePicker } from "../ui/datePicker";
import Loading from "../shared/Loading";
import clsx from "clsx";
import { formatPhoneNumber } from "@/utils/formatar";

const CalendarDay = ({
  events = [],
  setDataInicio,
  setDataFim,
  isLoading,
  setEditModal,
}) => {
  const today = new Date();
  const [date, setDate] = React.useState(new Date(today));

  useEffect(() => {
    if (date) {
      setDataInicio(date);
      setDataFim(date);
    }
  }, [date, setDataFim, setDataInicio]);

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

 

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-[0.20fr,3fr] pb-1 bg-white text-center sticky top-0 z-20 ">
            <span></span>
            <div className="flex">
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
                  {events?.map((event, eventIndex) => {
                    const startDate = new Date(event?.dataHoraInicio);
                    if (
                      startDate?.toDateString() === date?.toDateString() &&
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
                            "border-l-8  border rounded-sm bg-[#e6e6e6a6] text-left pl-5 absolute w-full z-10 overflow-hidden cursor-pointer",
                            event.tipoEvento === "ATENDIMENTO"
                              ? "border-l-purple-400"
                              : "border-l-roseprimary"
                          )}
                          onClick={() => setEditModal({ event, open: true })}
                          style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            minHeight: "2px",
                          }}
                        >
                          <div className="flex gap-12">
                            {event?.servico?.nome ? (
                              <h1 className="truncate">
                                {event?.servico?.nome}
                              </h1>
                            ) : (
                              event?.tipoEvento === "PESSOAL" && (
                                <h1 className="truncate">Evento Pessoal</h1>
                              )
                            )}
                            <h1 className="truncate">
                              {formatTime(event?.dataHoraInicio)} -{" "}
                              {formatTime(event?.dataHoraTermino)}
                            </h1>
                            <p>
                              {event?.cliente?.nome
                                && event?.cliente?.nome +
                                  " - " +
                                  formatPhoneNumber(event?.cliente?.telefone)}
                            </p>
                          </div>
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
