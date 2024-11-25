import TipoAgendamento from "@/components/agendamentos/TipoAgendamento";

const Legend = () => {
  const legendItems = [
    { colorClass: "bg-roseprimary", label: "Pessoal" },
    { colorClass: "bg-purple-400 ", label: "Atendimento" },
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
