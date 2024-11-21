import SearchInput from "@/components/sistema_clientes/SearchInput";
import TabsFilter from "@/components/sistema_clientes/TabsFilter";
import EstoqueCard from "@/components/sistema_estoque/EstoqueCard";
import { useEffect, useState } from "react";
import IconAdd from "../../assets/addIcon.svg";
import ModalAdicionar from "@/components/sistema_estoque/ModalAdicionar";
import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import { request } from "@/axios/request";
import { toast } from "react-toastify";

const EstoquePage = () => {
    const [produtos, setProdutos] = useState([]);
    const campos = [
        {
            name: "Tipo",
            field: "tipo",
            placeholder: "",
            type: "select",
        },
        {
            name: "Nome do produto",
            field: "nome",
            placeholder: "Digite o nome do produto",
            type: "text",
        },
        {
            name: "Preço de Compra (R$)",
            field: "valorCompra",
            placeholder: "Digite o preço de compra",
            type: "number",
        },
        {
            name: "Preço de Venda (R$)",
            field: "valorVenda",
            placeholder: "Digite o preço de venda",
            type: "number",
        },
        {
            name: "Quantidade por Embalagem",
            field: "quantidadeEmbalagem",
            placeholder: "ex: 300 (para 300ml)",
            type: "number",
        },
        {
            name: "Unidade de Medida",
            field: "unidadeMedida",
            placeholder: "ml, mg, gr",
            type: "select",
        },
        {
            name: "Marca",
            field: "marca",
            placeholder: "Digite a Marca",
            type: "text",
        },
        {
            name: "Unidades",
            field: "quantidade",
            placeholder: "Digite a quantidade de produtos",
            type: "number",
        },
        {
            name: "Foto",
            field: "foto",
            placeholder: "Escolha um arquivo",
            type: "file",
        },
    ];
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [nome, setNome] = useState("");

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await request.getProdutos();
                setProdutos(response.data);
            } catch (err) {
                tconsole.log('Erro ao buscar os produtos');
            }
        }

        fetchProdutos();
    }, []);

    const tabs = [
        { text: "Todos" },
        { text: "Salão", value: "SALAO" },
        { text: "Loja", value: "LOJA" }
    ];

    const filterProducts = (produtos, nomePesquisa, activeTabIndex) => {
        let filtered = produtos;

        if (nomePesquisa) {
            filtered = filtered.filter(produto =>
                produto?.produto?.nome.toLowerCase().includes(nomePesquisa.toLowerCase())
            );
        }

        if (tabs[activeTabIndex]?.text !== "Todos") {
            filtered = filtered.filter(produto => produto?.produto.tipo === tabs[activeTabIndex]?.value);
        }

        return filtered;
    };


    const handleSearch = async (nomePesquisa) => {
        setNome(nomePesquisa);
        const filteredProducts = filterProducts(produtos, nomePesquisa, activeTabIndex);

        setProdutos(filteredProducts);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onMinusClick = (id) => {
        setProdutos(prevProdutos =>
            prevProdutos.map(produto =>
                produto.produto.id === id
                    ? {
                        ...produto,
                        quantidade: produto.quantidade > 0
                            ? produto.quantidade - 1
                            : 0
                    }
                    : produto
            )
        );
    };

    const onPlusClick = (id) => {
        setProdutos(prevProdutos =>
            prevProdutos.map(produto =>
                produto.produto.id === id
                    ? {
                        ...produto,
                        quantidade: produto.quantidade + 1
                    }
                    : produto
            )
        );
    };

    const filteredProducts = filterProducts(produtos, nome, activeTabIndex);

    return (
        <main className="flex flex-col items-center justify-start relative pl-32 h-screen max-md:pl-0 max-md:pb-24">
            <HeaderSistema />
            <div className="w-11/12 h-full items-start flex flex-col justify-evenly">
                <div className="flex items-center space-x-2">
                    <span className="font-laisha text-4xl text-marromsecundary max-md:text-3xl">Estoque</span>
                    <img src={IconAdd} alt="" className="cursor-pointer" onClick={openModal} />
                </div>
                <div className="w-full h-[80%] shadow-lg rounded-lg flex flex-col p-6">
                    <div className="w-full flex justify-between max-md:flex-col">
                        <TabsFilter tabs={tabs} activeTabIndex={activeTabIndex} onTabClick={setActiveTabIndex} />
                        <SearchInput handleSearch={(e) => handleSearch(e.target.value)} />
                    </div>
                    <hr />
                    <div className="flex-1 overflow-y-auto max-h-[500px]">
                        <div className="grid grid-cols-2 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                            {Array.isArray(filteredProducts) && filteredProducts.map((produto, index) => (
                                <EstoqueCard
                                    key={index}
                                    produtoData={produto}
                                    campos={campos}
                                    onMinusClick={() => onMinusClick(produto?.produto.id)}
                                    onPlusClick={() => onPlusClick(produto?.produto.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (<ModalAdicionar onClose={closeModal} campos={campos} produtos={produtos} setProdutos={setProdutos} />)}
        </main>
    )
}

export default EstoquePage;