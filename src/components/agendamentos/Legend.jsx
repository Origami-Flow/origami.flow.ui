import TipoAgendamento from "@/components/agendamentos/TipoAgendamento";

const Legend = () => {
  const legendItems = [
    { colorClass: "bg-green-400", label: "Pessoal" },
    { colorClass: "bg-purple-700", label: "Atendimento" },
  ];

  return (
    <div>
      {legendItems.map((item, index) => (
        <TipoAgendamento key={index} className={item.colorClass} tipo={item.label} />
      ))}
    </div>
  );
};

export default Legend;
