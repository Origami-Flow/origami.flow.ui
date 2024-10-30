import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer/Footer";
import IconPage from "../../assets/icon-page-nossa-historia.svg";
import IconPaula from "../../assets/paula-historia 1.svg";
import PaulaEClinte from "../../assets/paula-e-cliente-historia.svg";

const NossaHistoria = () => {
  return (
    <main className="flex flex-col items-center justify-start relative pt-36 max-md:pt-36 max-lg:pt-36">
      <Header />
      <div>
        <img
          src={IconPage}
          alt="Formato Ondulado"
          className="absolute object-cover -z-10 w-[45%] left-0 top-0 max-md:hidden max-lg:hidden"
        />
      </div>
      <div className="flex justify-around w-11/12 h-2/4 relative z-10 items-center">
        <div className="flex flex-col h-[80%] space-y-10 max-md:w-full max-md:space-y-24 max-lg:w-full max-lg:space-y-10">
          <span className="font-laisha text-5xl text-marromsecundary max-md:4xl max-md:pt-8">
            Nossa História
          </span>
          <div className="flex space-x-72">
            <img
              src={IconPaula}
              alt="Foto Paula"
              className="w-[30%] z-10 max-md:hidden max-sm:hidden max-lg:hidden"
            />
            <div className="w-[41%] pl-10">
              <p className="text-marromsecundary font-laisha text-4xl">
                Quem é paula Salgado ?
              </p>
              <p className="text-2xl">
                <br />
                Natural de São Paulo, 32 anos. <br />
                <br />
                Graduada em pedagogia, com especialização em contação de
                histórias, atualmente , exerce a profissão de trancista.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rosesecundary w-full py-12 mt-20 flex items-center">
        <h2 className="text-marromsecundary font-laisha text-4xl pl-32">
          Como a Salgado Tranças nasceu
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center w-11/12 -mt-10 space-y-10 md:space-y-0">
        <div className="md:text-left w-full md:w-1/2 lg:w-2/3">
          <p className="text-2xl w-[80%]">
            A Salgado Tranças nasceu durante a pandemia, quando eu atuava como
            professora do segundo ano. Com o fechamento das escolas, continuamos
            as aulas online. Nesse período, busquei uma nova maneira de me
            conectar com as crianças e comecei a fazer tranças. Essa jornada,
            que une pedagogia e trançado, traz à tona a beleza da cultura
            afro-brasileira e promove o trabalho artesanal.
          </p>
        </div>
        <img
          src={PaulaEClinte}
          alt="Paula e Cliente"
          className="w-4/5 md:w-1/2 lg:w-1/3 mx-auto"
        />

        
      </div>
      <div className="md:text-left w-11/12">
        <p className="text-left text-2xl w-[70%]">
          Ao me reconectar com a ancestralidade das tranças, encontrei uma nova
          perspectiva de vida, buscando me aproximar das pessoas através do
          fortalecimento da autoestima. Cada conversa e cada trançado realizado
          são sementes de amorosidade, plantadas no coração de quem as recebe e
          vistas externamente pela sociedade.
        </p>
      </div>

      <Footer />
    </main>
  );
};

export default NossaHistoria;
