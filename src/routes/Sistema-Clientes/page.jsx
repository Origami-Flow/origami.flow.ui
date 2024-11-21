import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import ClientCard from "@/components/sistema_clientes/ClientCard";
import SearchInput from "@/components/sistema_clientes/SearchInput";
import TabsFilter from "@/components/sistema_clientes/TabsFilter";
import { useState, useEffect } from "react";
import { request } from '../../axios/request';



const ClientesPage = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await request.getClientes();
                setClientes(response.data);
            } catch (err) {
                setError('Erro ao buscar os clientes');
            }
        }

        fetchClientes();
    }, []);

    const tabs = [
        { text: "Todos" },
        { text: "Próximos 7 dias" },
        { text: "Próximos 15 dias" }
    ]

    return (
        <main className="flex flex-col items-center justify-start relative pl-32 h-screen max-md:pl-0 max-md:pb-24 ">
            <HeaderSistema />
            <div className="w-11/12 h-full items-start flex flex-col justify-evenly">
                <span className="font-laisha text-4xl text-marromsecundary max-md:text-3xl">Clientes</span>
                <div className="w-full h-[80%] shadow-lg rounded-lg flex flex-col p-6">
                    <div className="w-full flex justify-between max-md:flex-col">
                        <TabsFilter tabs={tabs} activeTabIndex={activeTabIndex} onTabClick={setActiveTabIndex} />
                        <SearchInput />
                    </div>
                    <hr />
                    <div className="flex-1 overflow-y-auto max-h-[500px]">
                        <div className="grid grid-cols-2 gap-4 p-4 max-lg:grid-cols-1">
                            {clientes.map((cliente, index) => (
                                <ClientCard key={index} clientData={cliente} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ClientesPage;