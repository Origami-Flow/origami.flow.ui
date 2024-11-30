import { useEffect, useState } from "react";
import { request } from "@/axios/request";

export const useFinancas = (mes, ano) => {
    const [dados, setDados] = useState({
        receitas: [{
            tipo: "receitas",
        }],
        despesas: [{
            tipo: "despesas",
            subTipo: "",
        }],
        totalDespesas: 0,
        geral: [{
            tipo: "geral",
        }]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [id, setId] = useState(1);

    const getLastDayOfMonth = (ano, mes) => {
        return `${ano}-${mes.toString().padStart(2, '0')}-${new Date(ano, mes, 0).getDate()}`;
    };

    useEffect(() => {
        const fetchDespesas = async () => {
            setLoading(true);
            setError(null);
            const lastDayOfMonth = getLastDayOfMonth(ano, mes);

            try {
                const [resDespesas, resTotalDespesas] = await Promise.all([
                    request.getDespesas(),
                    request.getTotalDespesas(
                        `${ano}-${mes.toString().padStart(2, '0')}-01`,
                        lastDayOfMonth
                    ),
                ]);

                const despesasFiltradas = resDespesas.data.filter(item => {
                    const itemData = new Date(item.data);
                    return itemData.getFullYear() === ano && itemData.getMonth() + 1 === mes;
                });

                const maiorId = Math.max(...despesasFiltradas.map(d => d.id), 0);
                setId(maiorId + 1);

                setDados({
                    receitas: [],
                    despesas: despesasFiltradas || [],
                    totalDespesas: resTotalDespesas.data || 0,
                    geral: despesasFiltradas || [],
                });
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setError("Não foi possível carregar os dados.");
            } finally {
                setLoading(false);
            }
        };

        fetchDespesas();
    }, [mes, ano]);

    return { dados, loading, error, id };
};
