import SearchInput from "@/components/sistema_clientes/SearchInput";
import TabsFilter from "@/components/sistema_clientes/TabsFilter";
import EstoqueCard from "@/components/sistema_estoque/EstoqueCard";
import { useEffect, useState } from "react";
import IconAdd from "../../assets/addIcon.svg";
import ModalAdicionar from "@/components/sistema_estoque/ModalAdicionar";
import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";
import { request } from "@/axios/request";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const EstoquePage = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtosOriginais, setProdutosOriginais] = useState([]);
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
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [inputOn, setInputOn] = useState(false);

    useEffect(() => {
        const fetchProdutos = async () => {
            setIsLoading(true);
            try {
                const response = await request.getProdutos();
                setProdutos(response.data || []);
                setProdutosOriginais(response.data)
            } catch (err) {
                console.log('Erro ao buscar os produtos', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    const tabs = [
        { text: "Todos" },
        { text: "Salão", value: "SALAO" },
        { text: "Loja", value: "LOJA" }
    ];

    const handleSearch = async (nomePesquisa) => {
        if (!nomePesquisa) return;

        try {
            const response = await request.getProdutosPorNome(nomePesquisa);
            const produtoPesquisado = await request.getProdutosPorId(response.data.id);
            const res = Array.isArray(produtoPesquisado.data) ? produtoPesquisado.data : [produtoPesquisado.data];

            setActiveTabIndex(0);
            setProdutos(res);
        } catch (error) {
            console.error('Erro ao buscar os produtos:', error);
            toast.error('Nome inválido.');
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onMinusClick = async (id) => {
        if (isUpdating) return;

        setIsUpdating(true);

        const produtoAtual = produtos.find(produto => produto.produto.id === id);
        if (produtoAtual.quantidade > 0) {
            const quantidade = produtoAtual.quantidade;
            const novaQuantidade = produtoAtual.quantidade - 1;

            try {
                const response = await request.updateEstoque(id, quantidade - novaQuantidade);
                setProdutos(prevProdutos =>
                    prevProdutos.map(produto =>
                        produto.produto.id === id
                            ? { ...produto, quantidade: response.data.quantidade }
                            : produto
                    )
                );
                setProdutosOriginais(prevProdutos =>
                    prevProdutos.map(produto =>
                        produto.produto.id === id
                            ? { ...produto, quantidade: response.data.quantidade }
                            : produto
                    )
                );

                toast.success("Quantidade atualizada com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar o estoque:", error);
                toast.error("Erro ao atualizar a quantidade. Tente novamente.");
            } finally {
                setIsUpdating(false);
            }
        } else {
            setIsUpdating(false);
        }
    };

    const onPlusClick = async (id) => {
        if (isUpdating) return;

        setIsUpdating(true);

        const produtoAtual = produtos.find(produto => produto.produto.id === id);

        const quantidade = produtoAtual.quantidade;
        const novaQuantidade = produtoAtual.quantidade + 1;


        try {
            const response = await request.updateEstoque(id, quantidade - novaQuantidade);

            setProdutos(prevProdutos =>
                prevProdutos.map(produto =>
                    produto.produto.id === id
                        ? { ...produto, quantidade: response.data.quantidade }
                        : produto
                )
            );
            setProdutosOriginais(prevProdutos =>
                prevProdutos.map(produto =>
                    produto.produto.id === id
                        ? { ...produto, quantidade: response.data.quantidade }
                        : produto
                )
            );

            toast.success("Quantidade atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar o estoque:", error);
            toast.error("Erro ao atualizar a quantidade. Tente novamente.");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleResetSearch = () => {
        setProdutos(produtosOriginais);
        setActiveTabIndex(0);
        const input = document.getElementById("default-search");
        input.value = "";
        setInputOn(false)
    };


    const filteredProducts = activeTabIndex === 0
        ? produtos
        : produtos.filter(produto => produto.produto.tipo === tabs[activeTabIndex]?.value);

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
                        <div className="flex items-center space-x-3">
                            {inputOn && <X className="text-marromsecundary cursor-pointer" onClick={handleResetSearch} />}
                            <SearchInput handleSearch={handleSearch} setInputOn={setInputOn}/>
                        </div>
                    </div>
                    <hr />
                    <div className="flex-1 overflow-y-auto max-h-[500px]">
                        <div className="grid grid-cols-2 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                            {isLoading ? (
                                <p>Carregando produtos...</p>
                            ) : (
                                filteredProducts.length > 0 ? (
                                    filteredProducts.map((produto, index) => (
                                        <EstoqueCard
                                            key={index}
                                            produtoData={produto}
                                            campos={campos}
                                            onMinusClick={() => onMinusClick(produto?.id)}
                                            onPlusClick={() => onPlusClick(produto?.id)}
                                        />
                                    ))
                                ) : (
                                    <p>Nenhum produto encontrado.</p>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (<ModalAdicionar onClose={closeModal} campos={campos} />)}
        </main>
    )
}

export default EstoquePage;