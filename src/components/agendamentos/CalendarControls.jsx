import TabsAgendamento from "./TabsAgendamento";

const CalendarControls = ({ tabs, setMedidaTemporal }) => {

  return (
    <div className="flex w-full space-y-10">
      <div className="flex flex-col w-[100%] items-center justify-center">
        <div className="w-[80%] flex justify-center">
          <TabsAgendamento tabs={tabs} initialTab={0} setMedidaTemporal={setMedidaTemporal} />
        </div>
      </div>
    </div>
  );
};

export default CalendarControls;
