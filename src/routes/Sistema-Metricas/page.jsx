import { useState, useEffect } from "react";
import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import KpiCard from "@/components/sistema_metricas/KpiCard";
import KpiCard2 from "@/components/sistema_metricas/KpiCard2";
import KpiCard3 from "@/components/sistema_metricas/KpiCard3";
import { request } from "@/axios/request";

// const dadosMockadosMetricas = {
//   2024: {
//     10: {
//       vendas: 20,
//       agendamentos: 10,
//       clientes: 50,
//       TrancaMaisRealizada: "Box Braids",
//       taxaConversao: "40%",
//       lucro: 5000,
//     },
//     11: {
//       vendas: 15,
//       agendamentos: 8,
//       clientes: 40,
//       TrancaMaisRealizada: "Nagô",
//       taxaConversao: "35%",
//       lucro: 4500, 
//     },
//   },
// };

const MetricasPage = () => {
  const [metricas, setMetricas] = useState({});
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);

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
    const carregarMetricas = async () => {
      try {
        const response = await request.getMetricas(mes, ano);
        setMetricas(response.data);
      }catch(err) {
        console.log("Erro ao buscar métricas", err);
      }finally {
        setIsLoading(false);
      }
    };

    carregarMetricas();
  }, [mes, ano]);

  const nomeMes = new Date(ano, mes - 1).toLocaleString("pt-BR", { month: "long" });

  return (
    <main className="flex flex-col items-center justify-start relative pl-32 h-screen max-md:pl-0 max-md:pb-24">
      <HeaderSistema />
      <div className="w-11/12 h-full flex flex-col gap-6 justify-start mt-5">
        <h1 className="font-laisha text-4xl text-marromsecundary max-md:text-3xl">
          Métricas
        </h1>
        {isLoading ? (
          <div className="flex-1 overflow-y-auto max-h-[500px]">
            <p className="grid grid-cols-2 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
              Carregando métricas...
            </p>
          </div>
        ) : (
          <>
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
              <KpiCard titulo="Vendas" valor={metricas?.vendasDoMes || 0} cor="bg-verdeprimary/90" />
              <KpiCard titulo="Agendamentos" valor={metricas?.agendamentosDoMes || 0} cor="bg-verdeprimary/90" />
              <KpiCard titulo="Clientes" valor={metricas?.clientesNovosNoMes || 0} cor="bg-verdeprimary/90" />
            </div>
            <div className="grid grid-cols-2 gap-6 h-32">
              <KpiCard2
                titulo="Trança Mais Realizada"
                valor={metricas?.trancaMaisFeitaNoMes}
                cor="bg-rosesecundary"
              />
              <KpiCard2
                titulo="Taxa de Conversão em Agendamentos"
                valor={metricas?.taxaDeClienteQueAgendaramNoMes}
                cor="bg-rosesecundary"
                showTooltip
              />
            </div>
            <div>
              <KpiCard3
                lucroMesAtual={metricas?.lucroDoMesAtual}
                lucroMesAnterior={metricas?.lucroDoMesPassado}
                cor="bg-blue-200"
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MetricasPage;
