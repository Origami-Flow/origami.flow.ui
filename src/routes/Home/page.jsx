import Button from "@/components/shared/Button";
import { useParallax } from "react-scroll-parallax";
import Imagem1 from "../../assets/imagem1_home.svg";
import Imagem2 from "../../assets/imagem2_home.svg";
import Imagem3 from "../../assets/imagem3_home.svg";
import Imagem4 from "../../assets/imagem4_home.svg";
import Imagem5 from "../../assets/imagem5_home.svg";
import SvgHome from "../../assets/svg_home.svg";
import Footer from "../../components/shared/Footer/Footer";
import Header from "../../components/shared/Header";

const HomePage = () => {
  const parallax = useParallax({
    speed: -10,
  });

  const ref = useParallax({
    speed: -10,
  });
  return (
    <>
      <img
        src={SvgHome}
        className="absolute w-[64%] top-0 right-0 -z-10 p-0"
        alt=""
      />
      <Header />
      <div className="pt-32 w-11/12 m-auto">
        <div className="w-full justify-between flex">
          <div 
          ref={parallax.ref}
           className="gap-12 h-[600px] flex">
            <div>
              <img className="h-full" src={Imagem1} alt="" />
            </div>
            <div className="flex flex-col justify-between py-2">
              <img className="h-[48%]" src={Imagem2} alt="" />
              <img className="h-[48%]" src={Imagem3} alt="" />
            </div>
            <div className="self-end h-[80%]">
              <img className="h-full" src={Imagem4} alt="" />
            </div>
          </div>
          <div className="flex items-center pr-16">
            <p className="text-white font-laisha text-[2.55rem] text-center">
              Onde a paixão <br /> pela beleza <div>e pelos cabelos se </div>
              unem à&nbsp; <br />
              <span className="font-bold">criatividade</span>.
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full mt-28 h-[29rem]">
        <div className=" -z-20 absolute top-0 left-0 w-full flex flex-col gap-10 items-center justify-center h-full bg-rosesecundary">
          <p className="font-laisha w-[26rem] text-center text-4xl">
            Qual tipo de trança mais combina com você?
          </p>
          <Button className="bg-roseprimary text-white px-20 h-16 cursor-pointer font-semibold text-2xl font-sans ">
            Veja Aqui
          </Button>
        </div>
      </div>
      <div className="mt-14 w-3/4 m-auto flex justify-between ">
        <div className="w-2/3 gap-10 flex flex-col">
          <p className="font-laisha text-7xl ">Afeto e Ancestralidade</p>
          <p className="text-2xl w-[79%]">
            No salão, as tranças vão além de um simples penteado, elas são uma
            expressão de cuidado, afeto e uma ligação profunda com a
            ancestralidade. Trançar o cabelo é um ritual que vem sendo passado
            de geração em geração, carregando consigo histórias, tradições e as
            memórias dos nossos antepassados. Cada trançado é uma forma de
            honrar essa herança, mantendo viva a cultura e o legado daqueles que
            vieram antes de nós. Aqui, no salão, esse momento se transforma em
            um espaço de conexão, onde o toque das mãos e as conversas
            fortalecem laços e criam um verdadeiro sentimento de pertencimento.
            As tranças, mais do que um estilo, representam um elo com a nossa
            história, celebrando a beleza e a força da cultura negra.
          </p>
          <Button className="bg-roseprimary mt-5 text-white px-20 h-16 w-fit cursor-pointer font-semibold text-2xl font-sans ">
            Conheça nossa História
          </Button>
        </div>
        <div>
          <img ref={ref.ref} className="drop-shadow-2xl" src={Imagem5} alt="" />
        </div>
      </div>
      <div className="h-[5000px]">

      </div>
      <Footer />
    </>
  );
};

export default HomePage;
