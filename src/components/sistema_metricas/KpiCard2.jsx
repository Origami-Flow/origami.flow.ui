const KpiCard2 = ({ titulo, valor, cor, showTooltip }) => (
    <div className={`relative flex flex-col items-center justify-center p-6 rounded-lg shadow-lg text-verdeprimary ${cor}`}>
      {showTooltip && (
        <div className="absolute top-2 right-2 group">
          <button
            className="w-6 h-6 flex items-center justify-center bg-gray-500 text-white rounded-full text-sm font-bold hover:bg-gray-700"
            aria-label="Informação"
          >
            ?
          </button>
          <div className="absolute top-10 right-0 w-56 bg-gray-800 text-white text-sm rounded-lg shadow-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
            A taxa de conversão indica o percentual de clientes convertidos em vendas com base no total de agendamentos.
          </div>
        </div>
      )}
  
      <h2 className="text-xl font-bold">{titulo}</h2>
      <p className="text-3xl font-semibold mt-2">{valor}</p>
    </div>
  );
  
  export default KpiCard2;