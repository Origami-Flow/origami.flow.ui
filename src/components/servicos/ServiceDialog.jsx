import React from "react";
import { AlertDialog, Flex, Button } from "@radix-ui/themes";

const ServiceDialog = ({ tipoTranca, valorSinal }) => {
    const [open, setOpen] = React.useState(false);
    const usuario = sessionStorage.USUARIO;
    const handleOpen = () => setOpen(!open);

    const phoneNumber = "5511985451774";
    const message = `Olá, Paula! Sou o(a) ${usuario || "N/A"}, estou super interessado(a) na trança *${tipoTranca}*. Poderia me dar mais informações, como preço, duração e sua disponibilidade?`;
    const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}&app_absent=0`;

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button className="bg-roseprimary p-3 rounded-xl text-branconeutro" onClick={handleOpen}>Agendar</button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Informações para agendamento</AlertDialog.Title>
                    <AlertDialog.Description size="3" className="flex flex-col space-y-3">
                        <span className="text-[18px]">Modelo: {tipoTranca || "Indefinido"}</span>
                        <span className="text-[18px]">Valor do sinal: R${valorSinal || "Indefinido"}</span>
                        <Flex justify="start" gap="3">
                            <a href={url} target="_blank" className="underline">WhatsApp</a>
                            <span>|</span>
                            <a href="https://www.instagram.com/salgadotrancas/" target="_blank" className="underline">Instagram</a>
                        </Flex>
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Action>
                            <Button variant="solid" color="brown">
                                OK
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
}

export default ServiceDialog;
