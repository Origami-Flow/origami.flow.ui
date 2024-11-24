import { horas } from "@/utils/datas";
import React, { useEffect } from "react";
import { DatePicker } from "../ui/datePicker";
import Loading from "../shared/Loading";

const CalendarDay = ({ events }) => {
    const today = new Date();
    const [date, setDate] = React.useState(new Date(today))
    const [isLoading, setIsLoading] = React.useState(false);
    useEffect(() => {
        console.log(date);
        const isoString = date.toISOString();
        console.log("ISO String for backend:", isoString);
    }, [date])

    const convertHoursInNumber = (horas) => parseInt(horas.replace('h', ''));

    const calculateEventPositionAndHeight = (event, cellHeight) => {
        const startHour = event.start.getHours() + event.start.getMinutes() / 60;
        const endHour = event.end.getHours() + event.end.getMinutes() / 60;

        const startOffset = (startHour % 1) * cellHeight;
        const durationInHours = endHour - startHour;
        const height = durationInHours * cellHeight;

        return { top: startOffset, height };
    };
    function formatTime(date) {
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <div className="grid grid-cols-[0.20fr,3fr] pb-1 w-full text-center sticky top-0 bg-white z-20 border-b">
                        <span></span>
                        <div className='flex w-full'>
                            <DatePicker date={date} setDate={setDate} />
                        </div>
                    </div>

                    <div className="grid grid-cols-[0.20fr,3fr]">
                        {horas.map((hour) => (
                            <React.Fragment key={hour}>
                                <div className="flex border justify-end pr-2">{hour}</div>
                                <div key={`${hour}`} className="border-t border-r h-12 relative">
                                    {events.map((event, eventIndex) => {
                                        if (event.start.getHours() === convertHoursInNumber(hour)) {
                                            const { top, height } = calculateEventPositionAndHeight(event, 48);
                                            return (
                                                <div
                                                    key={eventIndex}
                                                    className="border-l-8 border-l-purple-400 border rounded-sm bg-[#e6e6e6a6] text-left pl-5 absolute w-full z-10 overflow-hidden"
                                                    style={{ top: `${top}px`, height: `${height}px` }}
                                                >
                                                    <h1 className="truncate">
                                                        {event.title}
                                                    </h1>
                                                    <h1 className="truncate">
                                                        {formatTime(event.start)} - {formatTime(event.end)}
                                                    </h1>
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
    )
}
export default CalendarDay;
