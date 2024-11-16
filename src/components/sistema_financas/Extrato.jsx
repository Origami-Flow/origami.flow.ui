import Dropdown from "./Dropdown";

const optionsReceita = [
    {
        name: "Atendimento"
    },
    {
        name: "Venda de produto"
    },
    {
        name: "Outro"
    }
]

const optionsDespesa = [
    {
        name: "Mercadoria"
    },
    {
        name: "Outro"
    }
]

const optionsAssistente = [
    {
        name: "Pagamento"
    },
    {
        name: "Adicionar assistente"
    }
]

const Extrato = ({ filtrarExtrato, tipoExtrato }) => {
    const extratoFiltrado = filtrarExtrato();
    const valorTotal = extratoFiltrado.reduce((total, item) => total + item.valor, 0);

    const receita = extratoFiltrado.filter(item => item.tipo == 'Receitas')
        .reduce((total, item) => total + item.valor, 0);

    const despesas = extratoFiltrado.filter(item => item.tipo == 'Despesas')
        .reduce((total, item) => total + item.valor, 0);

    const assistentes = extratoFiltrado.filter(item => item.tipo == 'Assistente')
        .reduce((total, item) => total + item.valor, 0);

    const despesasTotais = despesas + assistentes;

    const lucro = receita - despesasTotais;

    return (
        <>
            <div className="flex items-center justify-between">
                <span className="text-2xl font-semibold">{tipoExtrato != "geral" ? `R$ ${valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : ""}</span>
                {tipoExtrato == "receitas" ? (
                    <Dropdown options={optionsReceita} tipoExtrato={tipoExtrato} />
                ) : tipoExtrato == "despesas" ? (
                    <Dropdown options={optionsDespesa} tipoExtrato={tipoExtrato}/>
                ) : tipoExtrato == "assistente" ? (
                    <Dropdown options={optionsAssistente} tipoExtrato={tipoExtrato}/>
                ) : ""}

            </div>
            <div className="p-6 rounded-lg w-full max-h-[400px] min-h-[400px] shadow-xl overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4">{tipoExtrato == "geral" ? "Extrato" : ""}</h2>
                {tipoExtrato === "geral" && (
                    <div className="mb-4">
                        <span className="font-semibold">Lucro: </span>
                        <span className="text-lg font-bold text-verdeprimary">
                            R$ {lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                )}
                <ul className="mt-4 space-y-3" >
                    {filtrarExtrato().map((item, index) => (
                        <li key={index} className="grid grid-cols-3 w-full gap-8 border-b items-center pb-2">
                            <div className="flex flex-col">
                                <span>{item.tipo}</span>
                                {item.cliente && <span className="text-sm text-gray-600">Cliente: {item.cliente}</span>}
                                {item.nome && <span className="text-sm text-gray-600">Nome: {item.nome}</span>}
                                {item.descricao && <span className="text-sm text-gray-600">{item.descricao}</span>}
                            </div>
                            <span className="text-center">R$ {item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            <span className="text-right">{item.data}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Extrato;