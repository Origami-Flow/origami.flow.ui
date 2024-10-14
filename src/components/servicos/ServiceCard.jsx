import { useEffect, useRef, useState } from "react";
import imgPadrao from "../../assets/barrel-capa-video.svg";
import { InfoIcon } from "lucide-react";
import ServiceDialog from "./ServiceDialog";

const ServiceCard = ({ foto, titulo, valorSinal, valorMinimo, valorMaximo }) => {
    const [isInformationOpen, setIsInformationOpen] = useState(false);
    const infoRef = useRef(null);
    const cardRef = useRef(null);

    const toggleInformation = () => {
        setIsInformationOpen((prev) => !prev);

        if (infoRef.current) {
            if (!isInformationOpen) {
                infoRef.current.classList.remove("hidden");
            } else {
                infoRef.current.classList.add("hidden");
            }
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsInformationOpen(false);
                if (infoRef.current) {
                    infoRef.current.classList.add("hidden");
                }
            }
        };

        if (isInformationOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isInformationOpen]);

    return (
        <div ref={cardRef} className="h-[88%] w-[90%] max-md:w-full max-md:h-full max-lg:h-full max-lg:w-full p-4 flex flex-col rounded-xl border-black/10 border-2 justify-between shadow-md hover:shadow-xl transition-shadow relative">
            <img src={foto || imgPadrao} alt={"Foto do serviço " + titulo || "N/A"} className="w-full h-[60%] object-cover rounded-xl" />
            <span className="text-2xl max-md:text-xl font-bold">{titulo || "N/A"}</span>

            <span className="flex justify-between">
                Valor do sinal
                <InfoIcon onClick={toggleInformation} cursor="pointer"/>
            </span>
            <span>R${valorSinal || "N/A"}</span>
            <ServiceDialog tipoTranca={titulo} valorSinal={valorSinal} imgModelo={foto}/>
            <div ref={infoRef} className="hidden p-4 border-marromsecundary border-opacity-5 border-2 w-[90%] h-fit absolute bg-branconeutro rounded-lg self-center bottom-4 max-lg:text-[14px] max-md:text-[12px]">
                <p>O preço dessa trança varia entre R${valorMinimo || "00,00"} e R${valorMaximo || "00,00"}.</p>
            </div>
        </div>
    )
}

export default ServiceCard;