import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import FinancasTabs from "@/components/sistema_financas/FinancasTabs";
import { useEffect, useState } from "react";

const dadosMockados = {
    "2024": {
        "7": {
            extrato: [
                { tipo: 'Receitas', valor: 650.00, data: '05/07', cliente: 'Carlos Souza', descricao: 'Venda produto A' },
                { tipo: 'Receitas', valor: 650.00, data: '07/07', cliente: 'João Lima', descricao: 'Venda produto C' },
                { tipo: 'Despesas', valor: 500.00, data: '10/07', cliente: '', descricao: 'Pagamento fornecedor X' },
                { tipo: 'Assistente', valor: 300.00, data: '15/07', cliente: '', descricao: 'Pagamento', nome: 'Thais' },
                { tipo: 'Despesas', valor: 400.00, data: '22/07', cliente: '', descricao: 'Pagamento fornecedor Z' },
            ]
        },
        "8": {
            extrato: [
                { tipo: 'Receitas', valor: 1400.00, data: '06/08', cliente: 'Ana Pereira', descricao: 'Atendimento' },
                { tipo: 'Despesas', valor: 400.00, data: '12/08', cliente: '', descricao: 'Pagamento fornecedor A' },
                { tipo: 'Assistente', valor: 250.00, data: '18/08', cliente: '', descricao: 'Pagamento', nome: 'Roberta' },
                { tipo: 'Despesas', valor: 400.00, data: '25/08', cliente: '', descricao: 'Pagamento fornecedor C' },
            ]
        },
        "9": {
            extrato: [
                { tipo: 'Receitas', valor: 1600.00, data: '03/09', cliente: 'João Santos', descricao: 'Venda produto B' },
                { tipo: 'Despesas', valor: 600.00, data: '11/09', cliente: '', descricao: 'Pagamento fornecedor D' },
                { tipo: 'Assistente', valor: 300.00, data: '17/09', cliente: '', descricao: 'Pagamento', nome: 'Thais' },
                { tipo: 'Despesas', valor: 400.00, data: '21/09', cliente: '', descricao: 'Pagamento fornecedor E' },
            ]
        },
        "10": {
            extrato: [
                { tipo: 'Receitas', valor: 1700.00, data: '05/10', cliente: 'Lucia Costa', descricao: 'Atendimento' },
                { tipo: 'Despesas', valor: 500.00, data: '12/10', cliente: '', descricao: 'Pagamento fornecedor F' },
                { tipo: 'Assistente', valor: 400.00, data: '18/10', cliente: '', descricao: 'Pagamento', nome: 'Tabata' },
                { tipo: 'Despesas', valor: 600.00, data: '25/10', cliente: '', descricao: 'Pagamento fornecedor G' },
            ]
        },
        "11": {
            extrato: [
                { tipo: 'Receitas', valor: 1800.00, data: '02/11', cliente: 'Maria Silva', descricao: 'Atendimento' },
                { tipo: 'Despesas', valor: 600.00, data: '10/11', cliente: '', descricao: 'Pagamento fornecedor H' },
                { tipo: 'Assistente', valor: 350.00, data: '15/11', cliente: '', descricao: 'Pagamento', nome: 'Joyce' },
                { tipo: 'Despesas', valor: 600.00, data: '20/11', cliente: '', descricao: 'Pagamento fornecedor I' },
            ]
        }
    }
};


const FinancasPage = () => {
    const [dados, setDados] = useState({
        receitas: 0,
        despesas: 0,
        assistentes: 0,
        lucro: 0,
        extrato: []
    });
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(2024);

    // const fetchData = async (mes, ano) => {
    //     try {
    //         const response = await fetch(`URL_DA_SUA_API/financas?mes=${mes}&ano=${ano}`);
    //         if (!response.ok) {
    //             throw new Error('Erro ao buscar os dados');
    //         }
    //         const data = await response.json();
    //         setDados({
    //             receitas: data.receitas,
    //             despesas: data.despesas,
    //             assistentes: data.assistentes,
    //             lucro: data.lucro,
    //             extrato: data.extrato,
    //         });
    //     } catch (error) {
    //         setError(error.message);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        // setLoading(true); 
        // fetchData(mes, ano);
        const carregarDados = () => {
            const dados = dadosMockados[ano] && dadosMockados[ano][mes] ? dadosMockados[ano][mes] : null;
            setDados(dados);
        };

        carregarDados();
    }, [mes, ano]);

    const handleMesAnterior = () => {
        if (mes === 1) {
            setMes(12);
            setAno(ano - 1);
        } else {
            setMes(mes - 1);
        }
    };

    const handleProximoMes = () => {
        if (mes === 12) {
            setMes(1);
            setAno(ano + 1);
        } else {
            setMes(mes + 1);
        }
    };

    // if (loading) {
    //     return <div>Carregando...</div>;
    // }

    // if (error) {
    //     return <div>Erro: {error}</div>;
    // }

    const nomeMes = new Date(ano, mes - 1).toLocaleString('pt-BR', { month: 'long' });

    return (
        <main className="flex flex-col items-center justify-start relative pl-32 h-screen max-md:pl-0 max-md:pb-24">
            <HeaderSistema />
            <div className="w-11/12 h-full items-start flex flex-col justify-evenly">
                <div className="flex items-center space-x-2">
                    <span className="font-laisha text-4xl text-marromsecundary max-md:text-3xl">Finanças</span>
                </div>
                <div className="flex items-center justify-between max-w-md w-[20%] self-center">
                    <button className="text-2xl" onClick={handleMesAnterior}>{'<'}</button>
                    <span className="text-lg font-semibold">
                        {nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)} {ano}
                    </span>
                    <button className="text-2xl" onClick={handleProximoMes}>{'>'}</button>
                </div>
                <div className="w-full">
                    <FinancasTabs dados={dados} />
                </div>
            </div>
        </main>
    )
}

export default FinancasPage;