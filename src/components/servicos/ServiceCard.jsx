import imgPadrao from "../../assets/barrel-capa-video.svg";

const ServiceCard = ({foto, titulo, valorSinal}) => {
    return(
        <div className="h-[88%] w-[90%] max-md:w-full max-md:h-full max-lg:h-full max-lg:w-full p-4 flex flex-col rounded-xl border-black/10 border-2 justify-between shadow-md hover:shadow-xl transition-shadow">
            <img src={foto || imgPadrao} alt={"Foto do serviço " + titulo || "N/A"} className="w-full h-[60%] object-cover rounded-xl"/>
            <span className="text-2xl max-md:text-xl font-bold">{titulo || "N/A"}</span>
            <span>Valor do sinal</span>
            <span>R${valorSinal || "N/A"}</span>
            <button className="bg-roseprimary p-3 rounded-xl text-branconeutro">Agendar</button>
        </div>
    )
}

export default ServiceCard;