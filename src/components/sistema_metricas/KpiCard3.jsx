const KpiCard3 = ({ lucroMesAtual, lucroMesAnterior, cor }) => {
    const lucroDiferenca = lucroMesAtual - lucroMesAnterior;
    const resultadoComparacao = lucroDiferenca >= 0 ? "aumento" : "redução";
    const classeDiferenca = lucroDiferenca >= 0 ? "text-lime-600" : "text-red-500";
  
    return (
      <div className={`flex flex-col items-center justify-center p-6 rounded-lg h-32 shadow-lg ${cor}`}>
        <h2 className="text-xl font-bold">Lucro: Comparação de Meses</h2>
        <p className="text-lg font-medium mt-2 text-center">
          O lucro do mês atual foi de <strong>R${lucroMesAtual}</strong>,{" "}
          comparado com <strong>R${lucroMesAnterior}</strong> no mês anterior.
        </p>
        <p className={`text-base font-medium mt-2 ${classeDiferenca}`}>
          Houve {resultadoComparacao} de <strong>R${Math.abs(lucroDiferenca)}</strong> em relação ao mês anterior.
        </p>
      </div>
    );
  };
  
  export default KpiCard3;
  