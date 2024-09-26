import Menu from "../../components/shared/Menu";
import Header from "../../components/shared/Header";
import vetor from "../../assets/vetor-top.svg";
import imgPrincipal from "../../assets/principal-tranca-e-afeto.svg"
import vetorSecundary from "../../assets/vetor-secundary.svg";
import imgSecundary from "../../assets/secundary-curso.svg";
import Footer from "../../components/shared/Footer/Footer";

const AfetoPage = () => {
    return (
        <main className="flex flex-col min-h-screen items-center relative pt-24">
            <Header />
            <Menu />
            <div className="flex justify-between w-11/12 h-2/3 relative z-10 mb-16">
                <div className="flex flex-col w-3/6 justify-evenly">
                    <span className="font-laisha text-6xl text-marromsecundary">Trança e Afeto</span>
                    <p className="text-2xl">O projeto "Trança e Afeto" é um curso de tranças que resgata a emoção e o afeto do ato de trançar. Muito mais que uma técnica de beleza, trançar envolve uma conexão profunda, carregando memórias afetivas e lembranças da infância, momentos de carinho, cuidado e vínculo entre gerações. O curso busca criar um espaço de aprendizado que também é um reencontro com a identidade, a história e a amorosidade transmitida por meio das tranças.</p>
                </div>
                <img src={imgPrincipal} alt="Paula e cliente" className=" z-10" />
            </div>
            <img src={vetor} alt="Vetor trança e afeto" className="absolute object-cover z-0 w-2/5 right-0 top-0" />

            <div className="flex justify-between items-center w-full h-2/4 relative z-10 mb-10">
                <img src={vetorSecundary} alt="" className="absolute object-cover z-0 left-0 w-1/3" />
                <img src={imgSecundary} alt="" className="z-0 w-2/4" />
                <div className="flex flex-col justify-center space-y-20">
                    <p className="text-2xl px-20">Oferecemos uma experiência completa, incluindo <b>coffee breaks</b> para interação, <b>rodas de conversa</b> sobre a importância cultural das tranças e uma <b>imersão prática</b> na arte do trançado. </p>
                    <p className="text-2xl px-20">Um espaço para aprender, compartilhar histórias e fortalecer laços.</p>
                </div>
            </div>
            <Footer />
        </main>
    )
}

export default AfetoPage;