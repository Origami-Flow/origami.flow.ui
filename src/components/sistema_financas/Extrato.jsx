import { ArrowDown, ArrowUp } from "lucide-react";
import Dropdown from "./Dropdown";

const optionsDespesa = [
    {
        name: "Mercadoria"
    },
    {
        name: "Pagamento"
    },
    {
        name: "Assistente"
    },
    {
        name: "Outro"
    }
]

const Extrato = ({ tipoExtrato, error, dados, showTooltip }) => {

    const formatarData = (data) => {
        if (!Array.isArray(data) || data.length !== 3) return "Data inválida";

        const [_, mes, dia] = data;
        return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}`;
    };

    const transacoes = [
        ...dados.despesas.map(item => ({ ...item, tipo: "despesa" })),
        ...dados.receitas.map(item => ({ ...item, tipo: "receita" }))
    ].sort((a, b) => {
        const dataA = Array.isArray(a?.data) ? new Date(a.data[0], a.data[1] - 1, a.data[2]) : new Date(0);
        const dataB = Array.isArray(b?.data) ? new Date(b.data[0], b.data[1] - 1, b.data[2]) : new Date(0);
        return dataB - dataA;
    });

    return (
        <>
            <div className="flex items-center justify-between">
                {tipoExtrato == "despesas" ? (
                    <div className="flex space-x-2 items-center">
                        <span className="text-2xl font-semibold">
                            {error ? "R$00,00" : `R$ ${dados.totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        </span>
                        <ArrowDown color="red" width={30} height={30} />
                    </div>
                ) : tipoExtrato == "receitas" ? (
                    <div className="flex space-x-2 items-center">
                        <span className="text-2xl font-semibold">
                            {error ? "R$00,00" : `R$ ${dados.totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
                        <ArrowUp color="green" width={30} height={30} />
                    </div>
                ) : (
                    <span className={`text-2xl font-semibold ${dados.lucro < 0 ? `text-red-500` : `text-green-500`}`}
                    >{error ? "R$00,00" : `R$ ${dados.lucro.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                    </span>
                )}

                {tipoExtrato == "despesas" && (
                    <Dropdown options={optionsDespesa} tipoExtrato={tipoExtrato} caixaId={dados?.caixaId} />
                )}

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

                {error ? (
                    <div>Erro: {error}</div>
                ) : (
                    <ul className="mt-4 space-y-3">
                        {tipoExtrato == "despesas" && dados.despesas &&
                            [...dados.despesas]
                                .sort((a, b) => {
                                    const dataA = new Date(a.data[0], a.data[1] - 1, a.data[2]);
                                    const dataB = new Date(b.data[0], b.data[1] - 1, b.data[2]);
                                    return dataB - dataA;
                                })
                                .map((item, index) => (
                                    <li key={`item-${index}`} className="grid grid-cols-3 w-full gap-8 border-b items-center pb-2">
                                        <div className="flex flex-col">
                                            <span>{item.nome || "Sem nome"}</span>
                                            <span className="text-gray-400">{item.descricao}</span>
                                        </div>

                                        <div className="flex justify-center space-x-2">
                                            <span className="text-center">
                                                {item.valor
                                                    ? `R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                                    : "R$ 0,00"}
                                            </span>
                                            <ArrowDown color="red" />
                                        </div>

                                        <span className="text-right">
                                            {formatarData(item.data)}
                                        </span>
                                    </li>
                                ))
                        }


                        {tipoExtrato == "receitas" && dados.receitas &&
                            [...dados.receitas]
                                .sort((a, b) => {
                                    const dataA = new Date(a.data[0], a.data[1] - 1, a.data[2]);
                                    const dataB = new Date(b.data[0], b.data[1] - 1, b.data[2]);
                                    return dataB - dataA;
                                })
                                .map((item, index) => (
                                    <li key={`item-${index}`} className="grid grid-cols-3 w-full gap-8 border-b items-center pb-2">
                                        <div className="flex flex-col">
                                            <span>Cliente: {item.nomeCliente || "Sem nome"}</span>
                                            <span className="text-gray-400">Atendimento/Venda</span>
                                        </div>

                                        <div className="flex justify-center space-x-2">
                                            <span className="text-center">
                                                {item.valor
                                                    ? `R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                                    : "R$ 0,00"}
                                            </span>
                                            <ArrowUp color="green" />
                                        </div>

                                        <span className="text-right">
                                            {formatarData(item.data)}
                                        </span>
                                    </li>
                                ))
                        }


                        {tipoExtrato == "geral" &&
                            transacoes
                                .map((item, index) => (
                                    <li key={`transacao-${index}`} className="grid grid-cols-3 w-full gap-8 border-b items-center pb-2">
                                        <div className="flex flex-col">
                                            <span>
                                                {item.tipo === "receita"
                                                    ? `Cliente: ${item.nomeCliente || "Sem nome"}`
                                                    : item.nome || "Sem nome"}
                                            </span>
                                            <span className="text-gray-400">
                                                {item.tipo === "receita" ? "Atendimento/Venda" : item.descricao || "Sem descrição"}
                                            </span>
                                        </div>

                                        <div className="flex justify-center space-x-2">
                                            <span className="text-center">
                                                {item.valor
                                                    ? `R$ ${item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
                                                    : "R$ 0,00"}
                                            </span>
                                            {item.tipo === "receita" ? (
                                                <ArrowUp color="green" />
                                            ) : (
                                                <ArrowDown color="red" />
                                            )}
                                        </div>

                                        <span className="text-right">
                                            {formatarData(item.data)}
                                        </span>
                                    </li>
                                ))
                        }
                    </ul>
                )}


            </div >
        </>
    )
}

export default Extrato;