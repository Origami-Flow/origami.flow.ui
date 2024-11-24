import { format, addDays, startOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { horas } from "@/utils/datas";
import React from 'react';

const CalendarGrid = ({ events }) => {
  const startDate = startOfWeek(new Date(), { weekStartsOn: 0 });

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(startDate, index);
    return {
      label: format(date, 'd EEE', { locale: ptBR }),
      isToday: date.getDate() === new Date().getDate(),
    };
  });

  const clearDays = days.map((day) => day.label.replace(/[^0-9]+/g, ''));

  const convertHoursInNumber = (horas) => parseInt(horas.replace('h', ''));

  const calculateEventPositionAndHeight = (event, cellHeight) => {
    const startHour = event.start.getHours() + event.start.getMinutes() / 60;
    const endHour = event.end.getHours() + event.end.getMinutes() / 60;

    const startOffset = (startHour % 1) * cellHeight;
    const durationInHours = endHour - startHour;
    const height = durationInHours * cellHeight;

    return { top: startOffset, height };
  };

  return (
    <div>
      <div className="grid grid-cols-8 pb-1 text-center sticky top-0 bg-white z-20 border-b">
        <div className="col-span-1"></div>
        {days.map((day, index) => (
          <div key={index} className={`${day.isToday ? 'bg-roseprimary text-white rounded-full' : ''}`}>
            {day.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        {horas.map((hour) => (
          <React.Fragment key={hour}>
            <div className="flex border justify-end pr-2">{hour}</div>
            {clearDays.map((day, dayIndex) => (
              <div key={`${hour}-${dayIndex}`} className="border-t border-r h-12 relative">
                {events.map((event, eventIndex) => {
                  if (event.start.getDate() === parseInt(day) && event.start.getHours() === convertHoursInNumber(hour)) {
                    const { top, height } = calculateEventPositionAndHeight(event, 48);
                    return (
                      <div
                        key={eventIndex}
                        className="border-l-8 border-l-purple-400 border rounded-sm bg-[#e6e6e6a6] text-center absolute w-full z-10 "
                        style={{ top: `${top}px`, height: `${height}px` }}
                      >
                        {event.title}
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
