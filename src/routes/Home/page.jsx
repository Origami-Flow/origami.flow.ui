import CardAvaliacoes from "@/components/home/CardAvaliacoes";
import Button from "@/components/shared/Button";
import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useParallax } from "react-scroll-parallax";
import Entrelacando1 from "../../assets/entrelacando1.svg";
import Entrelacando2 from "../../assets/entrelacando2.svg";
import Entrelacando3 from "../../assets/entrelacando3.svg";
import Imagem1 from "../../assets/imagem1_home.svg";
import Imagem2 from "../../assets/imagem2_home.svg";
import Imagem3 from "../../assets/imagem3_home.svg";
import Imagem4 from "../../assets/imagem4_home.svg";
import Imagem5 from "../../assets/imagem5_home.svg";
import SvgHome from "../../assets/svg_home.svg";

const HomePage = () => {
  const cardsAvaliacoes = [
    {
      nome: "Rafaela",
      texto:
        "As tranças que fiz com a Paula foram simplesmente maravilhosas! Ela tem uma habilidade incrível e realmente entendeu o que eu queria. O ambiente é acolhedor e a atenção aos detalhes é excepcional. Recomendo a todos!",
      qtdEstrelas: 5,
      foto: "https://images.unsplash.com/photo-1724812773684-e93ac802c2e0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      nome: "Pedro",
      texto:
        "Fiquei muito satisfeito com o resultado das minhas tranças! A trancista foi extremamente atenta às minhas necessidades e fez um trabalho impecável. Além disso, a experiência foi relaxante e divertida. Voltarei com certeza!",
      qtdEstrelas: 5,
      foto: "https://images.unsplash.com/photo-1521151716396-b2da27b1a19f?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      nome: "Ana",
      texto:
        "A experiência que tive com a trancista foi fantástica! Desde o início, ela foi super profissional e atenciosa. As tranças ficaram exatamente como eu imaginava, e ainda recebi muitos elogios. Muito feliz com o resultado!",
      qtdEstrelas: 5,
      foto: "https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      nome: "Leonardo",
      texto:
        "A trancista é uma verdadeira artista! O trabalho dela é de alta qualidade e ela faz tudo com muito carinho. Adorei a forma como ela cuidou de mim durante todo o processo. As tranças estão lindas e duradouras. Super recomendo!",
      qtdEstrelas: 5,
      foto: "https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const imagensEntrelacando = [
    {
      src: Entrelacando1,
      alt: "Imagem Detalhada de uma trança desenhada",
    },
    {
      src: Entrelacando2,
      alt: "Imagem Detalhada de uma trança desenhada",
    },
    {
      src: Entrelacando3,
      alt: "Imagem Detalhada de uma trança desenhada",
    },
  ];

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
        className="absolute w-[72rem] top-0 right-0 -z-10 p-0"
        alt=""
      />
      <Header />
      <div className="pt-32 w-11/12 m-auto">
        <div className="w-full justify-between flex">
          <div ref={parallax.ref} className="gap-12 h-[600px] flex">
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
          <div className="flex items-center px-16">
            <p className="text-white font-laisha text-[2.55rem] w-80 text-center">
              Onde a paixão pela beleza e pelos cabelos se 
              unem à&nbsp; <br />
              <span className="font-bold">criatividade</span>.
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full mt-28 h-[29rem]">
        <div className=" -z-20 absolute top-0 left-0 w-full flex flex-col gap-10 items-center justify-center h-full bg-rosesecundary">
          <h3 className="font-laisha sm:w-[26rem] text-center text-4xl">
            Qual tipo de trança mais combina com você?
          </h3>
          <Button className="bg-roseprimary text-white px-20 h-16 cursor-pointer font-semibold text-2xl font-sans ">
            Veja Aqui
          </Button>
        </div>
      </div>
      <div className="mt-14 w-3/4 m-auto flex justify-between ">
        <div className="w-2/3 gap-10 flex flex-col">
          <h1 className="font-laisha text-7xl">Afeto e Ancestralidade</h1>
          <p className="text-2xl w-[79%]">
            No salão, as <b className="text-roseprimary">tranças</b> vão além de
            um simples penteado, elas são uma expressão de{" "}
            <b className="text-roseprimary">cuidado, afeto</b> e uma ligação
            profunda com aancestralidade. Trançar o cabelo é um ritual que vem
            sendo passado de geração em geração, carregando consigo{" "}
            <b className="text-roseprimary">histórias, tradições</b> e as
            memórias dos nossos antepassados. Cada trançado é uma forma de
            honrar essa herança, mantendo viva a cultura e o legado daqueles que
            vieram antes de nós. Aqui, no salão, esse momento se transforma em
            um espaço de conexão, onde o toque das mãos e as conversas
            fortalecem laços e criam um verdadeiro sentimento de{" "}
            <b className="text-roseprimary"> pertencimento</b>. As tranças, mais
            do que um estilo, representam um elo com a nossa história,
            celebrando a <b className="text-roseprimary">beleza</b> e a força da
            cultura negra.
          </p>
          <Button className="bg-roseprimary mt-5 text-white px-[5%]  h-16 w-fit cursor-pointer font-semibold text-2xl font-sans ">
            Conheça nossa História
          </Button>
        </div>
        <div>
          <img ref={ref.ref} className="drop-shadow-2xl" src={Imagem5} alt="" />
        </div>
      </div>

      <div className="w-11/12 gap-10 m-auto flex flex-col relative items-center pt-20">
        <h1 className="font-laisha text-7xl text-center">
          Avaliações de Clientes
        </h1>
        <div className="hidden xl:flex pt-10 h-fit gap-5">
          {cardsAvaliacoes.map((card, index) => (
            <CardAvaliacoes key={index} {...card} />
          ))}
        </div>
        <div className="xl:hidden flex justify-center  w-full">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            opts={{
              align: "start",
            }}
            className="w-full max-w-[90%]"
          >
            <CarouselContent className="-ml-1">
              {cardsAvaliacoes.map((card, index) => (
                <CarouselItem
                  key={index}
                  className=" basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex w-full justify-center ">
                    <CardAvaliacoes {...card} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <Button className="bg-roseprimary mt-5 text-white px-[5%] h-16 w-fit cursor-pointer font-semibold text-2xl font-sans ">
          Adicione seu Feedback!
        </Button>
      </div>
      <div className="relative w-full ">
        <div className="w-full m-0 p-0 h-[40rem] bg-rosesecundary -z-10 -top-[16rem] absolute"></div>
      </div>

      <div className="w-11/12 m-auto flex flex-col gap-14 items-center pt-24">
        <h1 className="font-laisha text-7xl w-2/3 text-center ">
          Entrelaçando amorisidade em cada fio
        </h1>
        <div className="hidden xl:flex justify-center gap-10 w-full">
          {imagensEntrelacando.map((imagem, index) => (
            <img
              key={index}
              className="w-1/4 object-cover"
              src={imagem.src}
              alt={imagem.alt}
            />
          ))}
        </div>

        <div className="xl:hidden flex justify-center w-full">
          <Carousel
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            opts={{
              align: "start",
            }}
            className="w-full max-w-[90%]"
          >
            <CarouselContent className="-ml-1">
              {imagensEntrelacando.map((imagem, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2">
                  <div className="flex w-full justify-center">
                    <img
                      className="w-full h-[35rem] object-cover"
                      src={imagem.src}
                      alt={imagem.alt}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
