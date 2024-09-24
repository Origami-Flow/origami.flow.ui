import Menu from "../../components/shared/Menu";
import Header from "../../components/shared/Header";
import vetor from "../../assets/vetor-top.svg";
import imgPrincipal from "../../assets/principal-tranca-e-afeto.svg"
import vetorSecundary from "../../assets/vetor-secundary.svg";
import imgSecundary from "../../assets/secundary-curso.svg";

const AfetoPage = () => {
    return (
        <main className="flex flex-col h-screen items-center justify-center">
            <Header />
            <Menu />
            <div className="flex justify-between w-11/12 h-4/6 relative z-10">
                <div className="flex flex-col w-3/6 space-x-3 h-4/5 justify-around">
                    <span className="font-laisha text-6xl text-marromsecundary">Trança e Afeto</span>
                    <p className="text-2xl">O projeto "Trança e Afeto" é um curso de tranças que resgata a emoção e o afeto do ato de trançar. Muito mais que uma técnica de beleza, trançar envolve uma conexão profunda, carregando memórias afetivas e lembranças da infância, momentos de carinho, cuidado e vínculo entre gerações. O curso busca criar um espaço de aprendizado que também é um reencontro com a identidade, a história e a amorosidade transmitida por meio das tranças.</p>
                </div>
                <img src={imgPrincipal} alt="Paula e cliente" className="w-2/4 h-full z-10" />
            </div>
            <img src={vetor} alt="Vetor trança e afeto" className="absolute object-cover z-0 right-0 top-0" />

            <img src={vetorSecundary} alt="" className="absolute object-cover z-0 left-0 top-full" />

        </main>
    )
}

export default AfetoPage;