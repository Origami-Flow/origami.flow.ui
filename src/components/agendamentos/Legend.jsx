import TipoAgendamento from "@/components/agendamentos/TipoAgendamento";

const Legend = () => {
  const legendItems = [
    { colorClass: "bg-blue-500", label: "Pessoal" },
    { colorClass: "bg-purple-700", label: "Trabalho" },
    { colorClass: "bg-green-500", label: "Feriado" }
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
