import { useState, useEffect } from "react";
import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import KpiCard from "@/components/sistema_metricas/KpiCard";
import KpiCard2 from "@/components/sistema_metricas/KpiCard2";
import KpiCard3 from "@/components/sistema_metricas/KpiCard3";

const dadosMockadosMetricas = {
  2024: {
    10: {
      vendas: 20,
      agendamentos: 10,
      clientes: 50,
      TrancaMaisRealizada: "Box Braids",
      taxaConversao: "40%",
      lucro: 5000,
    },
    11: {
      vendas: 15,
      agendamentos: 8,
      clientes: 40,
      TrancaMaisRealizada: "Nagô",
      taxaConversao: "35%",
      lucro: 4500, 
    },
  },
};

const SistemaMetricas = () => {
  const [metricas, setMetricas] = useState({
    vendas: 0,
    agendamentos: 0,
    clientes: 0,
    TrancaMaisRealizada: "",
    taxaConversao: "0%",
    lucro: 0,
  });

  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());

  const mesAtual = new Date().getMonth() + 1;
  const anoAtual = new Date().getFullYear();

  const handleMesAnterior = () => {
    if (mes === 1) {
      setMes(12);
      setAno(ano - 1);
    } else {
      setMes(mes - 1);
    }
  };

  const handleProximoMes = () => {
    if (ano === anoAtual && mes >= mesAtual) return;
    if (mes === 12) {
      setMes(1);
      setAno(ano + 1);
    } else {
      setMes(mes + 1);
    }
  };

  useEffect(() => {
    const carregarMetricas = () => {
      const dados =
        dadosMockadosMetricas[ano] && dadosMockadosMetricas[ano][mes]
          ? dadosMockadosMetricas[ano][mes]
          : {
              vendas: 0,
              agendamentos: 0,
              clientes: 0,
              TrancaMaisRealizada: "",
              taxaConversao: "0%",
              lucro: 0,
            };
      setMetricas(dados);
    };

    carregarMetricas();
  }, [mes, ano]);

  const { lucro } = metricas;
  const nomeMes = new Date(ano, mes - 1).toLocaleString("pt-BR", { month: "long" });
  const lucroMesAnterior = dadosMockadosMetricas[ano] && dadosMockadosMetricas[ano][mes - 1]
    ? dadosMockadosMetricas[ano][mes - 1].lucro
    : 0;

  return (
    <main className="flex flex-col items-center justify-start relative pl-32 h-screen max-md:pl-0 max-md:pb-24">
      <HeaderSistema />
      <div className="w-11/12 h-full flex flex-col gap-6 justify-start mt-5">
        <h1 className="font-laisha text-4xl text-marromsecundary max-md:text-3xl">
          Métricas
        </h1>
        <div className="flex items-center justify-between max-w-md w-[20%] self-center">
          <button className="text-2xl" onClick={handleMesAnterior}>
            {"<"}
          </button>
          <span className="text-lg font-semibold">
            {nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)} {ano}
          </span>
          <button
            className={`text-2xl ${
              ano === anoAtual && mes === mesAtual ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleProximoMes}
            disabled={ano === anoAtual && mes === mesAtual}
          >
            {">"}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          <KpiCard titulo="Vendas" valor={metricas.vendas} cor="bg-verdeprimary/90" />
          <KpiCard titulo="Agendamentos" valor={metricas.agendamentos} cor="bg-verdeprimary/90" />
          <KpiCard titulo="Clientes" valor={metricas.clientes} cor="bg-verdeprimary/90" />
        </div>
        <div className="grid grid-cols-2 gap-6 h-32">
          <KpiCard2
            titulo="Trança Mais Realizada"
            valor={metricas.TrancaMaisRealizada}
            cor="bg-rosesecundary"
          />
          <KpiCard2
            titulo="Taxa de Conversão em Agendamentos"
            valor={metricas.taxaConversao}
            cor="bg-rosesecundary"
            showTooltip
          />
        </div>
        <div>
          <KpiCard3
            lucroMesAtual={lucro}
            lucroMesAnterior={lucroMesAnterior}
            cor="bg-blue-200"
          />
        </div>
      </div>
    </main>
  );
};

export default SistemaMetricas;
