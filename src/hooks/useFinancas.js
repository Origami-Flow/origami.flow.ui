import { useEffect, useState } from "react";
import { request } from "@/axios/request";

export const useFinancas = (mes, ano) => {
    const [dados, setDados] = useState({
        receitas: [{ tipo: "receitas" }],
        despesas: [{ tipo: "despesas" }],
        totalDespesas: 0,
        totalReceitas: 0,
        geral: [{ tipo: "geral" }],
        caixaId: null,
        lucro: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getLastDayOfMonth = (ano, mes) => {
        return `${ano}-${mes.toString().padStart(2, "0")}-${new Date(ano, mes, 0).getDate()}`;
    };

    const getFirstDayOfMonth = (ano, mes) => {
        return `${ano}-${mes.toString().padStart(2, "0")}-01`;
    };

    const checkOrCreateCaixa = async (ano, mes) => {
        try {
            const response = await request.getCaixa(mes, ano);
            const caixa = Array.isArray(response?.data)
                ? response.data.find((caixa) => {
                    const caixaAno = caixa.dataAbertura[0];
                    const caixaMes = caixa.dataAbertura[1];
                    return caixaAno === ano && caixaMes === mes;
                })
                : response?.data?.id && response?.data?.dataAbertura[0] === ano && response?.data?.dataAbertura[1] === mes
                    ? response.data
                    : null;

            if (caixa) {
                console.log("Caixa já existente:", caixa);
                return caixa;
            }

            const createResponse = await request.postCaixa(
                1,
                getFirstDayOfMonth(ano, mes),
                getLastDayOfMonth(ano, mes)
            );

            console.log("Novo caixa criado:", createResponse.data);
            return createResponse.data;

        } catch (err) {
            console.error("Erro ao verificar/criar caixa:", err);
            throw err;
        }
    };

    const formatarData = (ano, mes, dia) => {
        if (ano && mes && dia) {
            return `${String(ano).padStart(4, "0")}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
        }
        return null;
    };

    const fetchDespesas = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log("Iniciando requisição para o caixa...");
            const caixa = await checkOrCreateCaixa(ano, mes);
            console.log("Resposta do caixa:", caixa);

            if (!caixa?.dataAbertura || !caixa?.dataFechamento) {
                setError("Não foi possível obter as datas de abertura e fechamento do caixa.");
                setLoading(false);
                return;
            }

            const dataAbertura = formatarData(caixa?.dataAbertura[0], caixa?.dataAbertura[1], caixa?.dataAbertura[2]);
            const dataFechamento = formatarData(caixa?.dataFechamento[0], caixa?.dataFechamento[1], caixa?.dataFechamento[2]);

            if (!dataAbertura || !dataFechamento) {
                setError("Data de abertura ou fechamento inválida.");
                setLoading(false);
                return;
            }

            const [resFinancas] = await Promise.all([request.getFinancas(mes, ano)]);

            const despesasFiltradas = resFinancas.data.despesas.filter((item) => {
                const itemData = new Date(item.data);
                return itemData.getFullYear() === ano && itemData.getMonth() + 1 === mes;
            });

            const receitasFiltradas = resFinancas.data.atendimentos.filter((item) => {
                const itemData = new Date(item.data);
                return itemData.getFullYear() === ano && itemData.getMonth() + 1 === mes;
            });

            setDados({
                receitas: receitasFiltradas || [],
                despesas: despesasFiltradas || [],
                totalDespesas: caixa?.despesaTotal || 0,
                totalReceitas: caixa?.receitaTotal || 0,
                geral: despesasFiltradas || [],
                caixaId: caixa?.id || null,
                lucro: resFinancas.data.lucro,
            });
        } catch (err) {
            console.error("Erro ao buscar dados:", err);
            setError("Não foi possível carregar os dados.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDespesas();
    }, [mes, ano]);

    return { dados, loading, error, fetchDespesas };
};
