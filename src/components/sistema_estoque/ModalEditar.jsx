import { useEffect, useState } from "react";
import SelectCadastro from "../cadastro/SelectCadastro";
import InputFormulario from "../shared/InputFormulario";
import AlertDelete from "../shared/AlertDelete";
import { TrashIcon } from "lucide-react";
import { request } from "@/axios/request";
import { toast } from "react-toastify";

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
        name: "Foto",
        field: "foto",
        placeholder: "Escolha um arquivo",
        type: "file",
    },
];

const ModalEditar = ({ onClose, nameProduct, idProduct }) => {
    const [isOptionDisabled, setIsOptionDisabled] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [value, setValue] = useState({
        nome: "",
        marca: "",
        valorCompra: "",
        valorVenda: "",
        quantidadeEmbalagem: "",
        unidadeMedida: "",
        tipo: "",
        quantidade: "",
    });

    const [tempValue, setTempValue] = useState({ ...value });

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleTempChange = (campo, valor) => {
        if (valor !== "" && campo == "tipo") {
            setIsOptionDisabled(true);
        }

        setTempValue((prevState) => ({
            ...prevState,
            [campo]: valor,
        }));
    };

    const commitValue = (campo) => {
        setValue((prevState) => ({
            ...prevState,
            [campo]: tempValue[campo],
        }));
    };

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await request.getProdutosPorId(idProduct);
                const produtoAtual = response.data;

                setValue({
                    nome: produtoAtual.produto.nome || "",
                    marca: produtoAtual.produto.marca || "",
                    valorCompra: produtoAtual.produto.valorCompra || "",
                    valorVenda: produtoAtual.produto.valorVenda == 1 ? "" : produtoAtual.produto.valorVenda,
                    quantidadeEmbalagem: produtoAtual.produto.quantidadeEmbalagem || "",
                    unidadeMedida: produtoAtual.produto.unidadeMedida || "",
                    tipo: produtoAtual.produto.tipo || "",
                    quantidade: produtoAtual.quantidade || "",
                });
                setTempValue({
                    nome: produtoAtual.produto.nome || "",
                    marca: produtoAtual.produto.marca || "",
                    valorCompra: produtoAtual.produto.valorCompra || "",
                    valorVenda: produtoAtual.produto.valorVenda == 1 ? "" : produtoAtual.produto.valorVenda,
                    quantidadeEmbalagem: produtoAtual.produto.quantidadeEmbalagem || "",
                    unidadeMedida: produtoAtual.produto.unidadeMedida || "",
                    tipo: produtoAtual.produto.tipo || "",
                    quantidade: produtoAtual.quantidade || "",
                })
            } catch (err) {
                console.error("Erro ao buscar os dados do produto:", err);
                toast.error("Erro ao carregar os dados do produto.");
            }
        };

        fetchProduto();
    }, [idProduct]);

    const handleDelete = async (id) => {
        try {
            await request.deleteEstoque(id);
            await request.deleteProdutos(id);
            toast.success("Produto deletado com sucesso!", 3000);
            closeModal();
            window.location.reload();
        } catch (error) {
            toast.error("Erro ao deletar o produto");
            console.log(error);
        }
    };

    const handleSave = async () => {
        try {
            await request.updateProduto(idProduct, {
                ...value,
                valorVenda: value.valorVenda || "1.0",
            });
            toast.success("Produto atualizado com sucesso!", 3000);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error(error);
            toast.error("Erro ao salvar o produto.");
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-md:w-[80%]">
                <h2 className="text-xl font-bold mb-7 text-black">Editar</h2>

                <div className="grid grid-cols-2 gap-4">
                    {campos.map((campo, index) => (
                        <div key={index} className="h-20">
                            {campo.field === "tipo" ? (
                                <SelectCadastro
                                    key={index}
                                    name={campo.name}
                                    value={tempValue[campo.field] || ""}
                                    onChange={(e) => handleTempChange(campo.field, e.target.value)}
                                    onBlur={() => commitValue(campo.field)}
                                    options={[
                                        { value: "", label: "Selecione uma opção", disabled: isOptionDisabled },
                                        { value: "SALAO", label: "Salão" },
                                        { value: "LOJA", label: "Loja" },
                                    ]}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                />
                            ) : campo.field === "unidadeMedida" ? (
                                <SelectCadastro
                                    key={index}
                                    name={campo.name}
                                    value={tempValue[campo.field] || ""}
                                    onChange={(e) => handleTempChange(campo.field, e.target.value)}
                                    onBlur={() => commitValue(campo.field)}
                                    options={[
                                        { value: "", label: "Selecione uma opção", disabled: isOptionDisabled },
                                        { value: "ml", label: "ml" },
                                        { value: "mg", label: "mg" },
                                        { value: "gr", label: "gr" },
                                        { value: "kl", label: "kl" },
                                    ]}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                />
                            ) : campo.field === "foto" ? (
                                <input className="block w-full max-sm:w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="large_size" type="file" />
                            ) : (
                                <InputFormulario
                                    key={index}
                                    name={campo.name}
                                    type={campo.type}
                                    placeholder={campo.placeholder}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                    value={tempValue[campo.field] || ""}
                                    onChange={(e) => handleTempChange(campo.field, e.target.value)}
                                    onBlur={() => commitValue(campo.field)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex mt-6 items-center w-full justify-between">
                    <TrashIcon width={30} height={30} className="cursor-pointer" onClick={openModal} />
                    {isModalOpen && (<AlertDelete handleDelete={() => handleDelete(idProduct)} closeModal={closeModal} title={"Deletar produto: " + nameProduct} description="Você tem certeza? Esse produto será excluído permanentemente!" />)}
                    <div className="flex space-x-2">
                        <button
                            className="bg-roseprimary text-white px-6 py-2 rounded-md"
                            onClick={onClose}>
                            Cancelar
                        </button>
                        <button
                            className="bg-marromsecundary text-white px-6 py-2 rounded-md"
                            onClick={handleSave}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditar;