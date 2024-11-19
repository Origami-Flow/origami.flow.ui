import TabsFilter from "@/components/sistema_clientes/TabsFilter";

const CalendarControls = ({ tabs, setMedidaTemporal }) => {

  return (
    <div className="flex w-full space-y-10">
      <div className="flex flex-col w-[100%] items-center justify-center">
        <div className="w-[80%] flex justify-center">
          <TabsFilter tabs={tabs} initialTab={0} setMedidaTemporal={setMedidaTemporal} />
        </div>
      </div>
    </div>
  );
};

export default CalendarControls;
