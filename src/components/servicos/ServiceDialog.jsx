import React, { useState } from "react";
import { AlertDialog, Flex, Button } from "@radix-ui/themes";
import SelectCadastro from "../cadastro/SelectCadastro";
import { z } from "zod";
import { request } from "@/axios/request";
import { toast } from "react-toastify";
import decodeToken from "@/lib/decodeToken";

const campos = [
    {
        name: "Primeira vez trançando?",
        field: "primeiraTranca",
        type: "select",
    },
    {
        name: "Possui progressiva?",
        field: "progressiva",
        type: "select",
    },
    {
        name: "Comprimento do cabelo",
        field: "comprimento",
        type: "select",
    }
];
const ServiceDialog = ({ tipoTranca }) => {
    const [open, setOpen] = useState(true);
    const [isOptionDisabled, setIsOptionDisabled] = useState(true);
    const [value, setValue] = useState({
        primeiraTranca: "",
        progressiva: "",
        comprimento: ""
    });
    const [errors, setErrors] = useState({});
    const usuario = sessionStorage.USUARIO;
    const handleOpen = () => setOpen(!open);

    const phoneNumber = "5511985451774";
    const message = `Olá, Paula! Sou o(a) ${usuario || "N/A"}, estou super interessado(a) na trança *${tipoTranca}*. Poderia me dar mais informações, como preço, duração e sua disponibilidade?`;
    const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&app_absent=0`;

    const decodedToken = decodeToken();
    const userId = decodedToken?.id;

    const handleChange = (campo, valor) => {
        setValue((prevState) => ({
            ...prevState,
            [campo]: valor,
        }));
    };

    const validateFields = () => {
        const schema = z.object({
            primeiraTranca: z.string().min(1, "Por favor, selecione uma opção."),
            progressiva: z.string().min(1, "Por favor, selecione uma opção."),
            comprimento: z.string().min(1, "Por favor, selecione uma opção."),
        });

        try {
            schema.parse(value);
            setErrors({});
            return true;
        } catch (err) {
            const validationErrors = err.errors.reduce((acc, error) => {
                acc[error.path[0]] = error.message;
                return acc;
            }, {});
            setErrors(validationErrors);
            return false;
        }
    };

    const handleSave = async () => {
        if (validateFields()) {
            try {
                await request.updateCliente(userId, {
                    ...value,
                    primeira_tranca: value.primeiraTranca,
                    progressiva: value.progressiva,
                    comprimento_cabelo: value.comprimento
                });
                toast.success("Redirecionando para o whatsapp...", 3000);
                window.open(url, "_blank");
                setOpen(false);
            } catch (error) {
                console.error(error);
                toast.error("Erro ao atualizar dados.");
            }
        }
    };


    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button className="bg-roseprimary p-3 rounded-xl text-branconeutro" onClick={handleOpen}>Agendar</button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="400px" className="flex flex-col space-y-5" aria-modal>
                    <AlertDialog.Title>Informações para agendamento</AlertDialog.Title>
                    {campos.map((campo, index) => (
                        <div key={index} className="h-20">
                            {campo.field === "primeiraTranca" || campo.field === "progressiva" ? (
                                <SelectCadastro
                                    key={index}
                                    name={campo.name}
                                    value={value[campo.field] || ""}
                                    onChange={(e) => handleChange(campo.field, e.target.value)}
                                    options={[
                                        { value: "", label: "Selecione uma opção", disabled: isOptionDisabled },
                                        { value: "1", label: "Sim" },
                                        { value: "0", label: "Não" },
                                    ]}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                />
                            ) : (
                                <SelectCadastro
                                    key={index}
                                    name={campo.name}
                                    value={value[campo.field] || ""}
                                    onChange={(e) => handleChange(campo.field, e.target.value)}
                                    options={[
                                        { value: "", label: "Selecione uma opção", disabled: isOptionDisabled },
                                        { value: "CURTO", label: "Curto" },
                                        { value: "MEDIO", label: "Médio" },
                                        { value: "COMPRIDO", label: "Comprido" },
                                    ]}
                                    bgColor="bg-[#fff]"
                                    color="black"
                                />
                            )}
                            {errors[campo.field] && (
                                <p className="text-red-500 text-sm">{errors[campo.field]}</p>
                            )}
                        </div>
                    ))}

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel >
                            <Button variant="solid" color="gray" onClick={handleOpen} className="cursor-pointer">
                                Cancelar
                            </Button>
                        </AlertDialog.Cancel>
                        <Button variant="solid" color="brown" onClick={handleSave} className="cursor-pointer">
                            Agendar
                        </Button>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}

export default ServiceDialog;
