import Dropdown from "./Dropdown";

const optionsReceita = [
    {
        name: "Venda de produto"
    }
]

const optionsDespesa = [
    {
        name: "Mercadoria"
    },
    {
        name: "Assistente"
    },
    ,
    {
        name: "Pagamento"
    }
]

const Extrato = ({ tipoExtrato, error, dados, showTooltip }) => {

    const formatarData = (data) => {
        if (!Array.isArray(data) || data.length !== 3) return "Data inválida";

        const [_, mes, dia] = data;
        return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}`;
    };

    return (
        <>
            <div className="flex items-center justify-between">
                {tipoExtrato == "despesas" ? (
                    <span className="text-2xl font-semibold">{`R$ ${dados.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
                ) : tipoExtrato == "receitas" ? (
                    <span className="text-2xl font-semibold">{`R$ ${dados.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
                ) : (
                    <span className={`text-2xl font-semibold ${dados.lucro < 0 ? `text-red-500` : `text-green-500`}`}
                    >{`R$ ${dados.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    </span>
                )}

                {tipoExtrato == "receitas" ? (
                    <Dropdown options={optionsReceita} tipoExtrato={tipoExtrato} caixaId={dados?.caixaId} />
                ) : tipoExtrato == "despesas" ? (
                    <Dropdown options={optionsDespesa} tipoExtrato={tipoExtrato} caixaId={dados?.caixaId} />
                ) : ""}

                {tipoExtrato == "geral" && showTooltip && (
                    <div className="relative group right-4">
                        <button
                            className="w-8 h-8 flex items-center justify-center bg-gray-500 text-white rounded-full text-base font-bold hover:bg-gray-700"
                            aria-label="Informação"
                        >
                            ?
                        </button>
                        <div className="absolute right-0 w-[450px] bg-gray-800 text-white text-[13px] rounded-lg shadow-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            O lucro é baseado apenas nas receitas e despesas cadastradas!
                        </div>
                    </div>
                )}
            </div>
            <div className="p-6 rounded-lg w-full max-h-[400px] min-h-[400px] shadow-xl overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">Extrato</h2>

                <ul className="mt-4 space-y-3">
                    {tipoExtrato != "receitas" && dados.despesas.map((item, index) => (
                        <li key={`item-${index}`} className="grid grid-cols-3 w-full gap-8 border-b items-center pb-2">
                            <div className="flex flex-col">
                                <span>{item.nome || "Sem nome"}</span>
                                <span className="text-gray-400">{item.descricao}</span>
                            </div>

                            <span className="text-center">
                                {item.valor
                                    ? `R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                    : "R$ 0,00"}
                            </span>

                            <span className="text-right">
                                {formatarData(item.data)}
                            </span>
                        </li>
                    ))}

                    {tipoExtrato != "despesas" && dados.receitas.map((item, index) => (
                        <li key={`item-${index}`} className="grid grid-cols-3 w-full gap-8 border-b items-center pb-2">
                            <div className="flex flex-col">
                                <span>Cliente: {item.nomeCliente || "Sem nome"}</span>
                            </div>

                            <span className="text-center">
                                {item.valor
                                    ? `R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                    : "R$ 0,00"}
                            </span>

                            <span className="text-right">
                                {formatarData(item.data)}
                            </span>
                        </li>
                    ))}
                </ul>

                {error && (
                    <div>Erro: {error}</div>
                )}
            </div >
        </>
    )
}

export default Extrato;