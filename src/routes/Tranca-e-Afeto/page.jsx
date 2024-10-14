import Menu from "../../components/shared/Menu";
import Header from "../../components/shared/Header";
import vetor from "../../assets/vetor-top.svg";
import imgPrincipal from "../../assets/principal-tranca-e-afeto.svg"
import vetorSecundary from "../../assets/vetor-secundary.svg";
import imgSecundary from "../../assets/secundary-curso.svg";
import Footer from "../../components/shared/Footer/Footer";
import CardDepoimento from "@/components/tranca_e_afeto/CardDepoimento";
import imgDepoimento from "../../assets/pessoa1-depoimento.svg";
import imgCurso1 from "../../assets/img-trancaeafeto1.svg";
import imgCurso2 from "../../assets/img-trancaeafeto2.svg";
import imgCurso3 from "../../assets/img-trancaeafeto3.svg";
import imgCurso4 from "../../assets/img-trancaeafeto4.svg";
import imgCurso5 from "../../assets/img-trancaeafeto5.svg";

const AfetoPage = () => {
    return (
        <main className="flex flex-col items-center justify-start relative pt-24 max-md:pt-36 max-lg:pt-36">
            <Header />
            <Menu />
            <div className="flex justify-between w-11/12 h-2/4 relative z-10 items-center">
                <div className="flex flex-col w-3/6 h-[80%] space-y-24 max-md:w-full max-md:space-y-10 max-lg:w-full max-lg:space-y-10">
                    <span className="font-laisha text-5xl text-marromsecundary max-md:4xl max-md:px-8">Trança e Afeto</span>
                    <p className="text-2xl leading-relaxed max-md:xl max-md:px-8">O projeto "Trança e Afeto" é um curso de tranças que resgata a emoção e o afeto do ato de trançar. Muito mais que uma técnica de beleza, trançar envolve uma conexão profunda, carregando memórias afetivas e lembranças da infância, momentos de carinho, cuidado e vínculo entre gerações. O curso busca criar um espaço de aprendizado que também é um reencontro com a identidade, a história e a amorosidade transmitida por meio das tranças.</p>
                </div>
                <img src={imgPrincipal} alt="Paula e cliente" className="w-[45%] z-10 max-md:hidden max-sm:hidden max-lg:hidden" />
            </div>
            <img src={vetor} alt="Vetor trança e afeto" className="absolute object-cover z-0 w-2/5 right-0 top-0 max-md:hidden max-lg:hidden" />

            <div className="flex justify-between items-center w-full h-3/4 relative z-10 mt-32 space-y-10 max-md:flex-col max-md:mt-28">
                <img src={vetorSecundary} alt="" className="absolute object-cover z-0 left-0 w-1/3 max-md:hidden" />
                <img src={imgSecundary} alt="" className="left-0 z-0 w-2/4 h-full max-md:w-full" />
                <div className="flex flex-col justify-center space-y-20 max-md:space-y-10">
                    <p className="text-2xl px-20 max-md:px-8 leading-relaxed">Oferecemos uma experiência completa, incluindo <b>coffee breaks</b> para interação, <b>rodas de conversa</b> sobre a importância cultural das tranças e uma <b>imersão prática</b> na arte do trançado. </p>
                    <p className="text-2xl px-20 max-md:px-8 leading-relaxed">Um espaço para aprender, compartilhar histórias e fortalecer laços.</p>
                </div>
            </div>

            <div className="flex flex-col w-11/12 h-[80%] relative z-10 mt-32 space-y-16">
                <span className="font-laisha text-4xl text-marromsecundary max-md:px-6">Depoimentos</span>
                <div className="flex justify-evenly items-center w-full h-[90%] max-md:flex-col max-md:space-y-10">
                    <CardDepoimento foto={imgDepoimento} />
                    <CardDepoimento foto={imgDepoimento} />
                    <CardDepoimento foto={imgDepoimento} />
                </div>
            </div>

            <div className="flex flex-col space-y-4 max-md:space-y-2 max-lg:space-y-2 mt-32 w-full justify-center">
                <img src={vetorSecundary} alt="" className="absolute object-cover z-0 right-0 w-[55%] rotate-180" />
                <div className="flex justify-between space-x-4 max-md:space-x-2 max-lg:space-x-2 max-lg:w-full z-10">
                    <img src={imgCurso1} alt="Imagem 1" className="w-1/2 h-96 max-md:h-48 max-lg:h-72 object-cover rounded-r-3xl" />
                    <img src={imgCurso2} alt="Imagem 2" className="w-1/2 h-96 max-md:h-48 max-lg:h-72 object-cover rounded-l-3xl" />
                </div>
                <div className="flex justify-between space-x-4 max-md:space-x-2 max-lg:space-x-2 z-10 max-md:w-full">
                    <img src={imgCurso3} alt="Imagem 3" className="w-1/3 h-96 max-md:h-48 max-lg:h-72 object-cover rounded-r-3xl" />
                    <img src={imgCurso4} alt="Imagem 4" className="w-1/3 h-96 max-md:h-48 max-lg:h-72 object-cover rounded-3xl" />
                    <img src={imgCurso5} alt="Imagem 5" className="w-1/3 max-md:w-[31%] h-96 max-md:h-48 max-lg:h-72 object-cover rounded-l-3xl" />
                </div>
            </div>
            <div className="flex flex-col space-y-9 mt-32 w-11/12 items-center mb-0 pb-0">
                <span className="text-2xl">Se interessou pelo <b>curso</b>?</span>
                <button className="bg-marromsecundary p-4 text-branconeutro text-xl rounded-xl">Entre em contato</button>
            </div>

            <Footer />
        </main>
    )
}

export default AfetoPage;