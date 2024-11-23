const KpiCard = ({ titulo, valor, cor }) => (
    <div className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-lg text-rosesecundary ${cor}`}>
      <h2 className="text-xl font-bold ">{titulo}</h2>
      <p className="text-3xl font-semibold mt-2">{valor}</p>
    </div>
  );
  
  export default KpiCard;
  
  