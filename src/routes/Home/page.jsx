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

const HomePage = () => {
  const cardsAvaliacoes = [
    {
      nome: "Gaby",
      texto: `A trança ficou sensacional, só tirei porque já estava 700 dedos. Sem frizz, perfeita. Uma menina do trabalho falou: “Meu Deus, olha minha trança!” Tirou em um mês. Acho que foi a técnica nova, deu super bom. Eu e a Mary ficamos quase três meses.`,
      qtdEstrelas: 5,
      foto: "https://res.cloudinary.com/dt5smeslb/image/upload/v1743893476/home/xewalfeeoutwoufqtwyv.jpg",
    },
    {
      nome: "Pedro",
      texto:
        "Todo mundo elogiando seu trabalho aqui, slc a melhor mesmo! Parabéns 🔥👏🏽",
      qtdEstrelas: 5,
      foto: "https://res.cloudinary.com/dt5smeslb/image/upload/v1743893565/home/sgwhs9sdgvfwarm6y5pt.jpg",
    },
    {
      nome: "Beatriz",
      texto:
        "Nega, já estou a 21 dias com as tranças e elas seguem impecáveis, é a primeira vez que fico tanto tempo com uma trança sem enjoar ou me senti feia kjkk, só queria te dar esse feedback.",
      qtdEstrelas: 5,
      foto: "https://res.cloudinary.com/dt5smeslb/image/upload/v1743894087/home/wakszryjyvkjgqtbsl7i.jpg",
    },
  ];

  const imagensEntrelacando = [
    {
      src: "https://res.cloudinary.com/dt5smeslb/image/upload/v1743893005/home/tmwmstibow54zlpqwplt.svg",
      alt: "Imagem Detalhada de uma trança desenhada",
    },
    {
      src: "https://res.cloudinary.com/dt5smeslb/image/upload/v1743893006/home/t2yjztfdat9jfplkzao9.svg",
      alt: "Imagem Detalhada de uma trança desenhada",
    },
    {
      src: "https://res.cloudinary.com/dt5smeslb/image/upload/v1743893005/home/kfwoyk6fdqnnhexfvbw9.svg",
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
        src={
          "https://res.cloudinary.com/dt5smeslb/image/upload/v1743892657/home/zkb5usm2cx9cxfnjkzsd.svg"
        }
        className="absolute w-[72rem] top-0 right-0 -z-10 p-0"
        alt=""
      />
      <Header />
      <div className="pt-32 w-11/12 m-auto">
        <div className="w-full justify-between flex">
          <div ref={parallax.ref} className="gap-12 h-[600px] flex">
            <div>
              <img
                className="h-full"
                src={
                  "https://res.cloudinary.com/dt5smeslb/image/upload/v1743892658/home/s3d5uyp3w7m1awpofifr.svg"
                }
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between py-2">
              <img
                className="h-[48%]"
                src={
                  "https://res.cloudinary.com/dt5smeslb/image/upload/v1743892659/home/cinoannlhif8j9ntzzq9.svg"
                }
                alt=""
              />
              <img
                className="h-[48%]"
                src={
                  "https://res.cloudinary.com/dt5smeslb/image/upload/v1743892659/home/scpkcufdf1wyutjvh05x.svg"
                }
                alt=""
              />
            </div>
            <div className="self-end h-[80%]">
              <img
                className="h-full"
                src={
                  "https://res.cloudinary.com/dt5smeslb/image/upload/v1743892659/home/r4nv49psmimsjytybfzr.svg"
                }
                alt=""
              />
            </div>
          </div>
          <div className="flex items-center px-16">
            <p className="text-white font-laisha text-[2.55rem] w-80 text-center">
              Onde a paixão pela beleza e pelos cabelos se unem à&nbsp; <br />
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
          <img
            ref={ref.ref}
            className="drop-shadow-2xl"
            src={
              "https://res.cloudinary.com/dt5smeslb/image/upload/v1743892659/home/nxhfjl8kjonsirknvjka.svg"
            }
            alt=""
          />
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
          Entrelaçando amorosidade em cada fio
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
