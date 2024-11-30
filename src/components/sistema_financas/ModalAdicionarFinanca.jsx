import { useState, useEffect } from "react";
import SelectCadastro from "../cadastro/SelectCadastro";
import InputFormulario from "../shared/InputFormulario";
import { z } from "zod";
import { toast } from "react-toastify";
import { request } from "@/axios/request";

const camposPorTipo = {
    receitas: {
        "Venda de produto": [
            { name: "Produto", field: "nomeProduto", type: "select" },
            { name: "Valor (R$)", field: "valor", type: "number", placeholder: "20" },
            { name: "Quantidade", field: "quantidade", type: "number", placeholder: "10" },
            { name: "Cliente", field: "cliente", type: "select" },
            { name: "Data", field: "dataReceita", type: "date" }
        ]
    },
    despesas: {
        Mercadoria: [
            { name: "Nome", field: "nomeProduto", type: "text", placeholder: "Pomada" },
            { name: "Valor (R$)", field: "valor", type: "number", placeholder: "20" },
            { name: "Quantidade", field: "quantidade", type: "number", placeholder: "10" },
            { name: "Data", field: "dataDespesa", type: "date" }
        ],
        Assistente: [
            { name: "Nome Assistente", field: "nomeAssistente", type: "text", placeholder: "Maria Silva" },
            { name: "Email", field: "email", type: "email", placeholder: "nome@dominio.com" },
            { name: "Valor mão de obra (R$)", field: "valor", type: "number", placeholder: "100" },
        ],
        Pagamento: [
            { name: "Nome Assistente", field: "nomeAssistente", type: "select" },
            { name: "Valor mão de obra (R$)", field: "valor", type: "number", placeholder: "100" },
            { name: "Data", field: "dataDespesa", type: "date" }
        ]
    }
};

const ModalAdicionarFinanca = ({ onClose, tipo, subTipo, lastId }) => {
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});
    const [produtos, setProdutos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [assistentes, setAssistentes] = useState([]);

    useEffect(() => {
        if (tipo && subTipo) {
            const fields = camposPorTipo[tipo][subTipo] || [];
            setSelectedFields(fields);

            const initialValues = fields.reduce((acc, campo) => {
                acc[campo.field] = "";
                return acc;
            }, {});
            setFormValues(initialValues);
        }

        const fetchProdutos = async () => {
            try {
                const response = await request.getProdutos();
                setProdutos(response.data || []);
            } catch (err) {
                console.log('Erro ao buscar os produtos', err);
            }
        };

        const fetchClientes = async () => {
            try {
                const response = await request.getClientes();
                setClientes(response.data || []);
            } catch (err) {
                console.log('Erro ao buscar os clientes', err);
            }
        };

        const fetchAssistentes = async () => {
            try {
                const response = await request.getAssistentes();
                setAssistentes(response.data || []);
            } catch (err) {
                console.log('Erro ao buscar os clientes', err);
            }
        };

        fetchProdutos();
        fetchClientes();
        fetchAssistentes();
    }, [tipo, subTipo]);

    const handleInputChange = (field, value) => {
        setIsOptionDisabled(true);

        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (field === "nomeAssistente") {
            const assistenteSelecionado = assistentes.find((assistente) => assistente.nome === value);
            if (assistenteSelecionado) {
                setFormValues((prev) => ({
                    ...prev,
                    valor: assistenteSelecionado.valorMaoDeObra,
                }));
            }
        }


        try {
            const schema = getValidationSchema();
            schema.parse({ ...formValues, [field]: value });

            setErrors((prev) => {
                const { [field]: _, ...rest } = prev;
                return rest;
            });
        } catch (err) {
            const fieldError = err.errors?.find((e) => e.path[0] === field);
            if (fieldError) {
                setErrors((prev) => ({
                    ...prev,
                    [field]: fieldError.message,
                }));
            }
        }
    };

    const getValidationSchema = () => {
        const schemaShape = selectedFields.reduce((shape, campo) => {
            switch (campo.type) {
                case "text":
                    shape[campo.field] = z.string().min(3, `${campo.name} deve ter pelo menos 3 caracteres`);
                    break;
                case "number":
                    shape[campo.field] = z.preprocess(
                        (value) => (value !== "" ? Number(value) : value),
                        z.number({ invalid_type_error: `${campo.name} deve ser um número` })
                            .min(1, `${campo.name} deve ser maior que zero`)
                    );
                    break;
                case "date":
                    shape[campo.field] = z
                        .string().regex(/^\d{4}-\d{2}-\d{2}$/, `${campo.name} deve ter o formato de data 'YYYY-MM-DD'`)
                        .refine((value) => {
                            const [year, month, day] = value.split('-').map(Number);
                            const date = new Date(year, month - 1, day);
                            return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
                        }, `Não é uma data válida`);
                    break;
                case "select":
                    shape[campo.field] = z.string().min(1, `${campo.name} é obrigatório`);
                    break;
                case "email":
                    shape[campo.field] = z.string().email().min(1, `${campo.name} é obrigatório`);
                    break;
                default:
                    break;
            }
            return shape;
        }, {});
        return z.object(schemaShape);
    };

    const handleSave = () => {
        const schema = getValidationSchema();
        try {
            schema.parse(formValues);
            setErrors({});
            const produtoEncontrado = produtos.find(produto => produto?.produto?.descricao === formValues.nomeProduto);
            const idProduto = produtoEncontrado?.produto?.id || null;

            if (!produtoEncontrado && subTipo == "Mercadoria") {
                console.error("Produto não encontrado:", formValues.nomeProduto);
            }


            if (tipo == "despesas" && (subTipo == "Pagamento" || subTipo == "Mercadoria")) {
                const despesaData = {
                    descricao: formValues.nomeProduto || formValues.nomeAssistente,
                    valor: Number(formValues.valor) || 0,
                    data: formValues.dataDespesa || "",
                    idCaixa: 1,
                    produto_id: idProduto,
                };
                console.log("Dados válidos:", despesaData);

                request.postDespesa(
                    despesaData
                ).then(() => {

                    if (subTipo == "Mercadoria" && idProduto != null) {
                        const produtoData = {
                            nome: formValues.nomeProduto || formValues.nomeAssistente,
                            valorCompra: Number(formValues.valor) || 0,
                            quantidade: Number(formValues.quantidade),
                            idSalao: 1,
                            marca: "",
                            valorVenda: "1.0",
                            quantidadeEmbalagem: "",
                            unidadeMedida: "",
                            tipo: "SALAO",
                        };
                        console.log("Dados válidos:", produtoData);

                        request.postProdutos(
                            produtoData
                        ).then(() => {
                            toast.success("Produto adicionado no estoque com sucesso!");
                        }).catch(() => {
                            toast.error("Não foi possível realizar o cadastro, tente novamente mais tarde");
                        })

                        toast.success("Despesa cadastrada com sucesso!");
                    }

                    onClose();
                }).catch(() => {
                    toast.error("Não foi possível realizar o cadastro, tente novamente mais tarde");
                })

                setId(prevId => prevId + 1);
                window.location.reload();
            } else if (tipo == "despesas") {
                const assistenteData = {
                    nome: formValues.nomeAssistente || "",
                    email: formValues.email || "",
                    valorMaoDeObra: formValues.valor
                };
                console.log("Dados válidos:", assistenteData);

                request.postAssistente(
                    assistenteData
                ).then(() => {
                    toast.success("Assistente cadastrada com sucesso!");
                    onClose();
                }).catch(() => {
                    toast.error("Não foi possível realizar o cadastro, tente novamente mais tarde");
                })

                onClose();
            }

        } catch (err) {
            if (err.errors) {
                const newErrors = err.errors.reduce((acc, e) => {
                    acc[e.path[0]] = e.message;
                    return acc;
                }, {});
                setErrors(newErrors);
                toast.error("Erro ao salvar! Verifique os campos.", { autoClose: 3000 });
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-md:w-[80%]">
                <h2 className="text-xl font-bold mb-7 text-black">Adicionar {subTipo}</h2>

                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                    {selectedFields.map((campo, index) => (
                        <div key={index} className={"h-20"}>
                            {campo.type === "select" ? (
                                <SelectCadastro
                                    name={campo.name}
                                    onChange={(e) =>
                                        handleInputChange(campo.field, e.target.value)
                                    }
                                    options={[
                                        { value: "", label: "Selecione uma opção", disabled: isOptionDisabled },
                                        ...(campo.field === "nomeProduto"
                                            ? produtos.map((produto) => ({
                                                value: produto.produto.nome,
                                                label: produto.produto.nome,
                                            }))
                                            : campo.field === "cliente"
                                                ? clientes.map((cliente) => ({
                                                    value: cliente.nome,
                                                    label: cliente.nome,
                                                }))
                                                : campo.field === "nomeAssistente"
                                                    ? assistentes.map((assistente) => ({
                                                        value: assistente.nome,
                                                        label: assistente.nome,
                                                    })) : [
                                                        { value: "Mercadoria", label: "Mercadoria" },
                                                        { value: "Loja", label: "Loja" },
                                                    ]),
                                    ]}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                />
                            ) : (
                                <InputFormulario
                                    name={campo.name}
                                    type={campo.type}
                                    placeholder={campo.placeholder}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                    value={formValues[campo.field] || ""}
                                    onChange={(e) => handleInputChange(campo.field, e.target.value)}
                                    error={errors[campo.field]}
                                />
                            )}
                            {errors[campo.field] && (
                                <p className="text-red-500 text-sm">{errors[campo.field]}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-6 space-x-3">
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
    );
};

export default ModalAdicionarFinanca;

