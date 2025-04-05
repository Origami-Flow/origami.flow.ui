import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import FinancasTabs from "@/components/sistema_financas/FinancasTabs";
import { useFinancas } from "@/hooks/useFinancas";
import { useEffect, useState } from "react";


const FinancasPage = () => {
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const { dados, loading, error, fetchDespesas } = useFinancas(mes, ano);
    const [dadosCarregados, setDadosCarregados] = useState(false);

    useEffect(() => {
        if (!dadosCarregados) {
            fetchDespesas().then(() => setDadosCarregados(true)); 
        }
    }, [mes, ano, dadosCarregados, fetchDespesas]);

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

    const nomeMes = new Date(ano, mes - 1)?.toLocaleString('pt-BR', { month: 'long' });

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
                        {nomeMes?.charAt(0).toUpperCase() + nomeMes?.slice(1)} {ano}
                    </span>
                    <button className="text-2xl" onClick={handleProximoMes}>{'>'}</button>
                </div>
                <div className="w-full">
                    <FinancasTabs dados={dados} loading={loading} error={error}/>
                </div>
            </div>
        </main>
    )
}

export default FinancasPage;