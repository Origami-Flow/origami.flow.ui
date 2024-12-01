import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Loading from "../shared/Loading";
import clsx from "clsx";

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const CalendarMonth = ({
  events,
  setDataInicio,
  setDataFim,
  isLoading,
  onClick,
  setEditModal,
}) => {
  const today = useMemo(() => new Date(), []);
  const dayRefs = useRef([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(0);
  const monthOptions = monthNames.map((month, index) => ({
    name: month,
    value: `${index}`,
  }));

  useEffect(() => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    setDataInicio(startDate);
    setDataFim(endDate);
  }, [setDataFim, setDataInicio, year]);

  const scrollToDay = (monthIndex, dayIndex) => {
    const targetDayIndex = dayRefs.current.findIndex(
      (ref) =>
        ref &&
        ref.getAttribute("data-month") === `${monthIndex}` &&
        ref.getAttribute("data-day") === `${dayIndex}`
    );

    const targetElement = dayRefs.current[targetDayIndex];

    if (targetDayIndex !== -1 && targetElement) {
      const container = document.querySelector(".calendar-container");
      const elementRect = targetElement.getBoundingClientRect();
      const is2xl = window.matchMedia("(min-width: 1536px)").matches;
      const offsetFactor = is2xl ? 3 : 2.5;

      if (container) {
        const containerRect = container.getBoundingClientRect();
        const offset =
          elementRect.top -
          containerRect.top -
          containerRect.height / offsetFactor +
          elementRect.height / 2;

        container.scrollTo({
          top: container.scrollTop + offset,
          behavior: "smooth",
        });
      } else {
        const offset =
          window.scrollY +
          elementRect.top -
          window.innerHeight / offsetFactor +
          elementRect.height / 2;

        window.scrollTo({
          top: offset,
          behavior: "smooth",
        });
      }
    }
  };
  useEffect(() => {
    scrollToDay(today.getMonth(), today.getDate());
  }, [today]);

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleMonthChange = (event) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
    scrollToDay(monthIndex, 1);
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
    scrollToDay(today.getMonth(), today.getDate());
  };

  const handleDayClick = (day, month, year) => {
    if (!onClick) return;
    if (month < 0) {
      onClick(day, 11, year - 1);
    } else {
      onClick(day, month, year);
    }
  };

  const generateCalendar = useMemo(() => {
    const today = new Date();

    const daysInYear = () => {
      const daysInYear = [];
      const startDayOfWeek = new Date(year, 0, 1).getDay();

      if (startDayOfWeek < 6) {
        for (let i = 0; i < startDayOfWeek; i++) {
          daysInYear.push({ month: -1, day: 32 - startDayOfWeek + i });
        }
      }

      for (let month = 0; month < 12; month++) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
          daysInYear.push({ month, day });
        }
      }

      const lastWeekDayCount = daysInYear.length % 7;
      if (lastWeekDayCount > 0) {
        const extraDaysNeeded = 7 - lastWeekDayCount;
        for (let day = 1; day <= extraDaysNeeded; day++) {
          daysInYear.push({ month: 0, day });
        }
      }

      return daysInYear;
    };

    const calendarDays = daysInYear();

    const calendarWeeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      calendarWeeks.push(calendarDays.slice(i, i + 7));
    }

    const calendar = calendarWeeks.map((week, weekIndex) => (
      <div className="flex w-full" key={`week-${weekIndex}`}>
        {week.map(({ month, day }, dayIndex) => {
          const index = weekIndex * 7 + dayIndex;
          const isNewMonth =
            index === 0 || calendarDays[index - 1].month !== month;
          const isToday =
            today.getMonth() === month &&
            today.getDate() === day &&
            today.getFullYear() === year;

          return (
            <div
              key={`${month}-${day}`}
              ref={(el) => {
                dayRefs.current[index] = el;
              }}
              data-month={month}
              data-day={day}
              onClick={() => handleDayClick(day, month, year)}
              className={`relative z-10 m-[-0.5px] group aspect-square w-full grow cursor-pointer h-24 rounded-md border font-medium transition-all hover:z-20 hover:border-roseprimary`}
            >
              <span
                className={`absolute left-1 top-1 flex size-7 items-center justify-center rounded-full text-lg ${
                  isToday ? "bg-roseprimary font-semibold text-white" : ""
                }`}
              >
                {day}
              </span>
              <div className="mt-9 flex flex-wrap max-h-[40%] flex-row gap-1 overflow-y-auto w-full max-w-full">
                {events
                  ?.filter(
                    (event) =>
                      new Date(event.dataHoraInicio)?.toDateString() ==
                      new Date(year, month, day)?.toDateString()
                  )
                  ?.map((event, eventIndex) => (
                    <div
                      key={eventIndex}
                      onClick={() => setEditModal({ open: true, event })}
                      className={clsx(
                        "truncate rounded-md px-1 text-sm text-gray-800 cursor-pointer",
                        event.statusEvento === "FINALIZADO"
                          ? "bg-green-400 text-white"
                          : event.tipoEvento === "ATENDIMENTO"
                          ? "bg-purple-400 "
                          : "bg-roseprimary text-white"
                      )}
                    >
                      {event.servico?.nome || "Evento"}
                    </div>
                  ))}
              </div>
              {isNewMonth && (
                <span className="absolute h-fit bg-white bottom-0.5 left-0 w-full truncate px-1.5 text-sm font-semibold text-slate-500">
                  {monthNames[month]}
                </span>
              )}
            </div>
          );
        })}
      </div>
    ));

    return calendar;
  }, [events, handleDayClick, year]);

  useEffect(() => {
    const calendarContainer = document.querySelector(".calendar-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(entry.target.getAttribute("data-month"), 10);
            setSelectedMonth(month);
          }
        });
      },
      {
        root: calendarContainer,
        rootMargin: "-75% 0px -25% 0px",
        threshold: 0,
      }
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute("data-day") === "15") {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="no-scrollbar calendar-container max-h-full overflow-y-scroll rounded-t-2xl pb-10 pl-5 text-slate-800 shadow-xl">
          <div className="sticky -top-px z-50 w-full rounded-t-2xl bg-white px-5 pt-7">
            <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap gap-2">
                <Select
                  name=""
                  value={`${selectedMonth}`}
                  options={monthOptions}
                  onChange={handleMonthChange}
                />
                <button
                  onClick={handleTodayClick}
                  type="button"
                  className="rounded-lg border bg-white px-3 py-1.5 text-sm font-medium"
                >
                  Hoje
                </button>
              </div>
              <div className="flex w-fit items-center justify-between">
                <button
                  onClick={handlePrevYear}
                  className="rounded-full border p-1"
                >
                  <ChevronLeft />
                </button>
                <h1 className="text-lg font-semibold">{year}</h1>
                <button
                  onClick={handleNextYear}
                  className="rounded-full border p-1"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-gray-600">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="text-center font-semibold">
                  {day}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-2 px-1">{generateCalendar}</div>
        </div>
      )}
    </>
  );
};

export const Select = ({ name, value, label, options = [], onChange }) => (
  <div>
    {label && <label htmlFor={name}>{label}</label>}
    <select id={name} value={value} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);
