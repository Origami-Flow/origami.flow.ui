import { useRef } from "react";
import ServiceDialog from "./ServiceDialog";

const ServiceCard = ({ foto, titulo, valorSinal, valorMinimo, valorMaximo, showTooltip }) => {
    const infoRef = useRef(null);
    const cardRef = useRef(null);

    return (
        <div ref={cardRef} className="h-[88%] w-[90%] max-md:w-full max-md:h-full max-lg:h-full max-lg:w-full p-4 flex flex-col rounded-xl border-black/10 border-2 justify-between shadow-md hover:shadow-xl transition-shadow relative">
            <img src={foto} alt={"Foto do serviço " + titulo || "N/A"} className="w-full h-[60%] object-cover rounded-xl" />
            <span className="text-2xl max-md:text-xl font-bold">{titulo || "N/A"}</span>
            <div className="flex justify-between w-full" >
                <span className="text-xl">R${valorMinimo} ~ R${valorMaximo + 20}</span>
                {showTooltip && (
                    <div className="relative group">
                        <button
                            className="w-6 h-6 flex items-center justify-center bg-gray-500 text-white rounded-full text-sm font-bold hover:bg-gray-700"
                            aria-label="Informação"
                        >
                            ?
                        </button>
                        <div className="absolute right-0 w-[280px] bg-gray-800 text-white text-[13px] rounded-lg shadow-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                            A variação do preço da trança depende do comprimento e do modelo escolhido.
                        </div>
                    </div>
                )}
            </div>
            <span className="flex justify-between">Valor do sinal: R${valorSinal || "N/A"}</span>
            <ServiceDialog tipoTranca={titulo} valorSinal={valorSinal} imgModelo={foto} />
            <div ref={infoRef} className="hidden p-4 border-marromsecundary border-opacity-5 border-2 w-[90%] h-fit absolute bg-branconeutro rounded-lg self-center bottom-4 max-lg:text-[14px] max-md:text-[12px]">
                <p>O preço dessa trança varia entre R${valorMinimo || "00,00"} e R${valorMaximo || "00,00"}.</p>
            </div>
        </div>
    )
}

export default ServiceCard;