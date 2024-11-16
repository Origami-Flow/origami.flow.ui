import SearchInput from "@/components/sistema_clientes/SearchInput";
import TabsFilter from "@/components/sistema_clientes/TabsFilter";
import EstoqueCard from "@/components/sistema_estoque/EstoqueCard";
import { useState } from "react";
import IconAdd from "../../assets/addIcon.svg";
import ModalAdicionar from "@/components/sistema_estoque/ModalAdicionar";
import HeaderSistema from "@/components/shared/header_sistema/HeaderSistema";

const EstoquePage = () => {
    const [produtos, setProdutos] = useState([
        {
            id: 1,
            nome: 'Pomada',
            unidades: 50,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '300',
            unidadeDeMedida: 'gr',
            marca: 'Lore Ipsum',
            tipoEstoque: 'Salão',
            precoCompra: 20.00,
            precoVenda: null,
        },
        {
            id: 2,
            nome: 'Cabelo Sintético',
            unidades: 100,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '100',
            unidadeDeMedida: 'gr',
            marca: 'HairPro',
            tipoEstoque: 'Loja',
            precoCompra: 40.00,
            precoVenda: 80.00,
        },
        {
            id: 3,
            nome: 'Óleo Capilar',
            unidades: 30,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '200',
            unidadeDeMedida: 'ml',
            marca: 'NaturalCare',
            tipoEstoque: 'Salão',
            precoCompra: 15.00,
            precoVenda: null,
        },
        {
            id: 4,
            nome: 'Shampoo Hidratante',
            unidades: 70,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '500',
            unidadeDeMedida: 'ml',
            marca: 'CurlsPlus',
            tipoEstoque: 'Loja',
            precoCompra: 25.00,
            precoVenda: 45.00,
        },
        {
            id: 5,
            nome: 'Gel Fixador',
            unidades: 80,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '250',
            unidadeDeMedida: 'ml',
            marca: 'FixPlus',
            tipoEstoque: 'Salão',
            precoCompra: 12.00,
            precoVenda: null,
        },
        {
            id: 6,
            nome: 'Elástico para Tranças',
            unidades: 200,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '50',
            unidadeDeMedida: 'gr',
            marca: 'TrançasPro',
            tipoEstoque: 'Loja',
            precoCompra: 5.00,
            precoVenda: 10.00,
        },
        {
            id: 7,
            nome: 'Pomada',
            unidades: 50,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '300',
            unidadeDeMedida: 'gr',
            marca: 'Lore Ipsum',
            tipoEstoque: 'Salão',
            precoCompra: 20.00,
            precoVenda: null,
        },
        {
            id: 8,
            nome: 'Cabelo Sintético',
            unidades: 100,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '100',
            unidadeDeMedida: 'gr',
            marca: 'HairPro',
            tipoEstoque: 'Loja',
            precoCompra: 40.00,
            precoVenda: 80.00,
        },
        {
            id: 9,
            nome: 'Óleo Capilar',
            unidades: 30,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '200',
            unidadeDeMedida: 'ml',
            marca: 'NaturalCare',
            tipoEstoque: 'Salão',
            precoCompra: 15.00,
            precoVenda: null,
        },
        {
            id: 10,
            nome: 'Shampoo Hidratante',
            unidades: 70,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '500',
            unidadeDeMedida: 'ml',
            marca: 'CurlsPlus',
            tipoEstoque: 'Loja',
            precoCompra: 25.00,
            precoVenda: 45.00,
        },
        {
            id: 11,
            nome: 'Gel Fixador',
            unidades: 80,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '250',
            unidadeDeMedida: 'ml',
            marca: 'FixPlus',
            tipoEstoque: 'Salão',
            precoCompra: 12.00,
            precoVenda: null,
        },
        {
            id: 12,
            nome: 'Elástico para Tranças',
            unidades: 200,
            foto: 'https://via.placeholder.com/150',
            quantidadeEmbalagem: '50',
            unidadeDeMedida: 'ml',
            marca: 'TrançasPro',
            tipoEstoque: 'Loja',
            precoCompra: 5.00,
            precoVenda: 10.00,
        },
    ]);
    const campos = [
        {
            name: "Tipo",
            field: "tipoEstoque",
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
            field: "precoCompra",
            placeholder: "Digite o preço de compra",
            type: "number",
        },
        {
            name: "Preço de Venda (R$)",
            field: "precoVenda",
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
            field: "unidadeDeMedida",
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
            field: "unidades",
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

    const tabs = [
        { text: "Todos" },
        { text: "Salão" },
        { text: "Loja" }
    ];

    const filteredProducts = tabs[activeTabIndex]?.text === "Todos"
        ? produtos
        : produtos.filter(produto => produto?.tipoEstoque === tabs[activeTabIndex]?.text);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const onMinusClick = (id) => {
        setProdutos(prevProdutos =>
            prevProdutos.map(produto =>
                produto.id === id
                    ? {
                        ...produto,
                        unidades: produto.unidades > 0
                            ? produto.unidades - 1
                            : 0
                    }
                    : produto
            )
        );
    };

    const onPlusClick = (id) => {
        setProdutos(prevProdutos =>
            prevProdutos.map(produto =>
                produto.id === id
                    ? {
                        ...produto, 
                        unidades: produto.unidades + 1
                    }
                    : produto
            )
        );
    };

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
                        <SearchInput />
                    </div>
                    <hr />
                    <div className="flex-1 overflow-y-auto max-h-[500px]">
                        <div className="grid grid-cols-2 gap-4 p-4 max-lg:grid-cols-2 max-md:grid-cols-1">
                            {Array.isArray(filteredProducts) && filteredProducts.map((produto, index) => (
                                <EstoqueCard
                                    key={index}
                                    produtoData={produto}
                                    campos={campos}
                                    onMinusClick={() => onMinusClick(produto?.id)}
                                    onPlusClick={() => onPlusClick(produto?.id)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (<ModalAdicionar onClose={closeModal} campos={campos} />)}
        </main>
    )
}

export default EstoquePage;