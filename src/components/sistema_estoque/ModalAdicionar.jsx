import { useEffect, useState } from "react";
import SelectCadastro from "../cadastro/SelectCadastro";
import InputFormulario from "../shared/InputFormulario";
import { request } from "@/axios/request";
import { toast } from "react-toastify";

const ModalAdicionar = ({ onClose, campos }) => {
    const [isOptionDisabled, setIsOptionDisabled] = useState(false);
    const [column, setColumn] = useState("");
    const [value, setValue] = useState({
        nome: "",
        marca: "",
        valorCompra: "",
        valorVenda: "",
        quantidadeEmbalagem: "",
        unidadeMedida: "",
        tipo: "",
        quantidade: "",
        idSalao: "",
    });
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        console.log(event.target.files);
        setFile(event.target.files[0]);
    };

    const [tempValue, setTempValue] = useState({ ...value });

    const handleTempChange = (campo, valor) => {
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
        const idSalao = localStorage.getItem('idSalao');
        setValue((prevState) => ({
            ...prevState,
            idSalao: idSalao || "1",
        }));
    }, []);


    const handleSave = () => {
        console.log("Objeto enviado para a API:", value);
        const formData = new FormData();

        formData.append("nome", value.nome);
        formData.append("marca", value.marca);
        formData.append("valorCompra", value.valorCompra);
        formData.append("valorVenda", value.valorVenda || "1.0");
        formData.append("quantidadeEmbalagem", value.quantidadeEmbalagem);
        formData.append("unidadeMedida", value.unidadeMedida);
        formData.append("tipo", value.tipo);
        formData.append("quantidade", value.quantidade);
        formData.append("idSalao", value.idSalao);
        formData.append("imagem", file);

        request.postProdutos(formData).then(() => {
            toast.success("Cadastro realizado com sucesso!");

            onClose();
            window.location.reload();
        }).catch(() => {
            toast.error("Não foi possível realizar o cadastro, tente novamente mais tarde");
        })
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 min-w-fit shadow-lg ">
                <h2 className="text-xl font-bold mb-7 text-black">Adicionar</h2>

                <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4">
                    {campos.map((campo, index) => (
                        <div key={index} className={"h-20 " + column}>
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
                                <input
                                    className="block w-full max-sm:w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                    id="large_size"
                                    type="file"
                                    onChange={handleFileChange}
                                />
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
    )
}

export default ModalAdicionar;