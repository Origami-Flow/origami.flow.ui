import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import ClientCard from "@/components/sistema_clientes/ClientCard";
import SearchInput from "@/components/sistema_clientes/SearchInput";
import TabsFilter from "@/components/sistema_clientes/TabsFilter";
import { useState } from "react";


const ClientesPage = () => {
    const [clientes, setClientes] = useState([
        {
            nome: 'Larissa Souza',
            email: 'larissasouza@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '00/00/0000',
            endereco: 'Rua Lore Ipsum, Zona Lore',
            ocupacao: 'Lore Ipsum',
            fezProgressiva: true,
            telefone: '(11) 90000-0000',
            tipoCabelo: '3A',
            primeiraVez: true,
            tamanhoCabelo: "10cm",
            corCabelo: "Castanho"
        },
        {
            nome: 'Julia Hikari',
            email: 'juliahikari@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '01/01/1990',
            endereco: 'Rua Hikari, Bairro Luz',
            ocupacao: 'Desenvolvedora',
            fezProgressiva: false,
            telefone: '(11) 90000-1111',
            tipoCabelo: '2B',
            primeiraVez: false,
            tamanhoCabelo: "40cm",
            corCabelo: "Loiro"
        },
        {
            nome: 'Jean Rocha',
            email: 'jeanrocha@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '05/05/1985',
            endereco: 'Rua Rocha, Bairro Pedra',
            ocupacao: 'Designer',
            fezProgressiva: false,
            telefone: '(11) 90000-2222',
            tipoCabelo: '4C',
            primeiraVez: true,
            tamanhoCabelo: "10cm",
            corCabelo: "Castanho"
        },
        {
            nome: 'Larissa Souza',
            email: 'larissasouza@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '00/00/0000',
            endereco: 'Rua Lore Ipsum, Zona Lore',
            ocupacao: 'Lore Ipsum',
            fezProgressiva: true,
            telefone: '(11) 90000-0000',
            tipoCabelo: '3A',
            primeiraVez: true,
            tamanhoCabelo: "10cm",
            corCabelo: "Castanho"
        },
        {
            nome: 'Julia Hikari',
            email: 'juliahikari@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '01/01/1990',
            endereco: 'Rua Hikari, Bairro Luz',
            ocupacao: 'Desenvolvedora',
            fezProgressiva: false,
            telefone: '(11) 90000-1111',
            tipoCabelo: '2B',
            primeiraVez: false,
            tamanhoCabelo: "10cm",
            corCabelo: "Castanho"
        },
        {
            nome: 'Jean Rocha',
            email: 'jeanrocha@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '05/05/1985',
            endereco: 'Rua Rocha, Bairro Pedra',
            ocupacao: 'Designer',
            fezProgressiva: false,
            telefone: '(11) 90000-2222',
            tipoCabelo: '4C',
            primeiraVez: true,
            tamanhoCabelo: "10cm",
            corCabelo: "Castanho"
        },
        {
            nome: 'Larissa Souza',
            email: 'larissasouza@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '00/00/0000',
            endereco: 'Rua Lore Ipsum, Zona Lore',
            ocupacao: 'Lore Ipsum',
            fezProgressiva: true,
            telefone: '(11) 90000-0000',
            tipoCabelo: '3A',
            primeiraVez: true,
            tamanhoCabelo: "10cm",
            corCabelo: "Castanho"
        },
        {
            nome: 'Julia Hikari',
            email: 'juliahikari@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '01/01/1990',
            endereco: 'Rua Hikari, Bairro Luz',
            ocupacao: 'Desenvolvedora',
            fezProgressiva: false,
            telefone: '(11) 90000-1111',
            tipoCabelo: '2B',
            primeiraVez: false,
            tamanhoCabelo: "10cm",
            corCabelo: "Castanho"
        },
        {
            nome: 'Jean Rocha',
            email: 'jeanrocha@gmail.com',
            foto: 'https://via.placeholder.com/50',
            dataNascimento: '05/05/1985',
            endereco: 'Rua Rocha, Bairro Pedra',
            ocupacao: 'Designer',
            fezProgressiva: false,
            telefone: '(11) 90000-2222',
            tipoCabelo: '4C',
            primeiraVez: true,
            tamanhoCabelo: "10cm",
            corCabelo: "Preto"
        },
    ]);
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const tabs = [
        {text: "Todos"},
        {text: "Próximos 7 dias"},
        {text: "Próximos 15 dias"}
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
                                <ClientCard key={index} clientData={cliente}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ClientesPage;