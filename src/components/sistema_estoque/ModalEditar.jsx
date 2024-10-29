import { useEffect, useState } from "react";
import SelectCadastro from "../cadastro/SelectCadastro";
import InputFormulario from "../shared/InputFormulario";
import AlertDelete from "../shared/AlertDelete";
import { TrashIcon } from "lucide-react";

const ModalEditar = ({ onClose, nameProduct, produtoData, campos }) => {
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [formValues, setFormValues] = useState({});

    const produtoAtual = Array.isArray(produtoData) ?
        produtoData.find(produto => produto.nome === nameProduct) : null;

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    useEffect(() => {
        if (produtoAtual) {
            setFormValues(produtoAtual);
        }
    }, [produtoAtual]);

    const handleChange = (value, field) => {
        if (value !== "" && field == "tipo") {
            setIsOptionDisabled(true);
        }

        setFormValues(prevValues => ({
            ...prevValues,
            [field]: value
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-md:w-[80%]">
                <h2 className="text-xl font-bold mb-7 text-black">Editar</h2>

                <div className="grid grid-cols-2 gap-4">
                    {campos.map((campo, index) => (
                        <div key={index} className="h-20">
                            {campo.field === "tipoEstoque" ? (
                                <SelectCadastro
                                    key={index}
                                    name={campo.name}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.value,
                                            campo.field
                                        )
                                    }
                                    options={[
                                        { value: "", label: "Selecione uma opção", disabled: isOptionDisabled },
                                        { value: "Salão", label: "Salão" },
                                        { value: "Loja", label: "Loja" },
                                    ]}
                                    value={formValues[campo.field] || ""}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                />
                            ) : campo.field === "unidadeDeMedida" ? (
                                <SelectCadastro
                                    key={index}
                                    name={campo.name}
                                    onChange={(e) =>
                                        handleChange(
                                            e.target.value,
                                            campo.field
                                        )
                                    }
                                    options={[
                                        { value: "", label: "Selecione uma opção", disabled: isOptionDisabled },
                                        { value: "ml", label: "ml" },
                                        { value: "mg", label: "mg" },
                                        { value: "gr", label: "gr" },
                                        { value: "kl", label: "kl" },
                                    ]}
                                    value={formValues[campo.field] || ""}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                />
                            ) : campo.field === "foto" ? (
                                <input className="block w-full max-sm:w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="large_size" type="file"/>
                            ) : (
                                <InputFormulario
                                    key={index}
                                    name={campo.name}
                                    type={campo.type}
                                    placeholder={campo.placeholder}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                    value={formValues[campo.field] || ""}
                                    onChange={(e) => handleChange(e.target.value, campo.field)}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex mt-6 items-center w-full justify-between">
                    <TrashIcon width={30} height={30} className="cursor-pointer" onClick={openModal} />
                    {isModalOpen && (<AlertDelete closeModal={closeModal} title={"Deletar produto: " + nameProduct} description="Você tem certeza? Esse produto será excluído permanentemente!" />)}
                    <div className="flex space-x-2">
                        <button
                            className="bg-roseprimary text-white px-6 py-2 rounded-md"
                            onClick={onClose}>
                            Cancelar
                        </button>
                        <button
                            className="bg-marromsecundary text-white px-6 py-2 rounded-md"
                            onClick={onClose}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditar;