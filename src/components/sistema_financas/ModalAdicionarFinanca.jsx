import { useState, useEffect } from "react";
import SelectCadastro from "../cadastro/SelectCadastro";
import InputFormulario from "../shared/InputFormulario";
import { z } from "zod";
import { toast } from "react-toastify";

const camposPorTipo = {
    receitas: {
        Atendimento: [
            { name: "Cliente", field: "cliente", type: "text", placeholder: "Digite o nome do cliente" },
            { name: "Valor (R$)", field: "valor", type: "number", placeholder: "Digite o valor" },
            { name: "Data", field: "dataReceita", type: "date" }
        ],
        "Venda de produto": [
            { name: "Produto", field: "nomeProduto", type: "select" },
            { name: "Valor (R$)", field: "valor", type: "number", placeholder: "Digite o valor" },
            { name: "Quantidade", field: "quantidade", type: "number", placeholder: "Digite a quantidade" },
            { name: "Cliente", field: "cliente", type: "text", placeholder: "Digite o nome do cliente" },
            { name: "Data", field: "dataReceita", type: "date" }
        ],
        Outro: [
            { name: "Tipo", field: "tipo", type: "text", placeholder: "Digite o tipo de receita" },
            { name: "Valor (R$)", field: "valor", type: "number", placeholder: "Digite o valor" },
            { name: "Descrição", field: "descricao", type: "text", placeholder: "Digite a descrição da receita" },
            { name: "Data", field: "dataReceita", type: "date" }
        ]
    },
    despesas: {
        Mercadoria: [
            { name: "Nome", field: "nomeProduto", type: "text", placeholder: "Digite o nome do produto" },
            { name: "Valor (R$)", field: "valor", type: "number", placeholder: "Digite o valor" },
            { name: "Fornecedor", field: "fornecedor", type: "text", placeholder: "Digite o nome do fornecedor" },
            { name: "Data", field: "dataDespesa", type: "date" }
        ],
        Outro: [
            { name: "Tipo", field: "tipo", type: "text", placeholder: "Digite o tipo de despesa" },
            { name: "Valor (R$)", field: "valor", type: "number", placeholder: "Digite o valor" },
            { name: "Descrição", field: "descricao", type: "text", placeholder: "Digite a descrição da despesa" },
            { name: "Data", field: "dataDespesa", type: "date" }
        ]
    },
    assistente: {
        Pagamento: [
            { name: "Nome do Assistente", field: "nomeAssistente", type: "select" },
            { name: "Valor (R$)", field: "valorAssistente", type: "number", placeholder: "Digite o valor" },
            { name: "Data", field: "dataAssistente", type: "date" }
        ],
        "Adicionar assistente": [
            { name: "Nome do Assistente", field: "nomeAssistente", type: "text", placeholder: "Digite o nome do assistente" },
            { name: "Telefone", field: "telefone", type: "text", placeholder: "Digite o telefone do assistente" }
        ]
    }
};

const ModalAdicionarFinanca = ({ onClose, tipo, subTipo }) => {
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [selectedFields, setSelectedFields] = useState([]);
    const [formValues, setFormValues] = useState({});
    const [errors, setErrors] = useState({});

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
    }, [tipo, subTipo]);

    const handleInputChange = (field, value) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    
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
                    shape[campo.field] = z.string().min(4, `${campo.name} deve ter pelo menos 4 caracteres`);
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
            console.log("Dados válidos:", formValues);
            toast.success("Dados salvos com sucesso!", { autoClose: 3000 });
            onClose();
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
                                        { value: "Mercadoria", label: "Mercadoria" },
                                        { value: "Loja", label: "Loja" },
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

