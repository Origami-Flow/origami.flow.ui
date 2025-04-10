import { request } from "@/axios/request";
import { SelectComponent } from "@/components/servicos/SelectComponent";
import ServiceCard from "@/components/servicos/ServiceCard";
import ServiceDialog from "@/components/servicos/ServiceDialog";
import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header";
import Menu from "@/components/shared/Menu";
import { TrashIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import imgPrincipal from "../../assets/principal-servicos.svg";
import vetor from "../../assets/vetor-servicos.svg";
import Loading from "../../components/shared/Loading";

const ServicosPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("todos");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchServicos = async () => {
      setLoading(true);
      try {
        const response = await request.getServicos();
        console.log("Serviços", response.data);
        setServices(response.data);
      } catch (err) {
        console.log("Erro ao buscar os serviços", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicos();
  }, []);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    const inputFile = document.getElementById("large_size");
    setFile(null);
    inputFile.value = "";
  };

  return (
    <main className="flex flex-col items-center justify-start relative pt-36 max-md:pt-36 max-lg:pt-36">
      <Header />
      <Menu />
      <div className="w-11/12 flex flex-col space-y-16">
        <span className="font-laisha text-5xl text-marromsecundary max-md:text-4xl">
          Serviços
        </span>
        <div className="flex flex-col h-28 justify-between">
          <p className="text-2xl max-md:text-xl">Já tem uma referência?</p>
          <div className="flex">
            <input
              className="block w-[50%] max-sm:w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="large_size"
              type="file"
              onChange={handleFileChange}
            />

            {file && (
              <button
                onClick={handleRemoveFile}
                className="text-marromsecundary"
              >
                <TrashIcon width={"30px"} height={"30px"} className="ml-5" />
              </button>
            )}
          </div>
        </div>
        {file && (
          <div className="flex items-center space-x-2">
            <ServiceDialog />
          </div>
        )}
      </div>
      <img
        src={vetor}
        alt=""
        className="absolute right-0 top-0 z-0 h-[85vh] max-md:h-[30vh] max-lg:h-[50vh]"
      />
      <img
        src={imgPrincipal}
        alt=""
        className="absolute right-[5%] top-0 z-10 h-[75vh] max-md:hidden max-lg:h-[50vh]"
      />

      <div className="w-11/12 mt-32 space-y-6">
        <div className="space-y-6 flex flex-col w-[50%] max-lg:w-full">
          <span className="text-xl">Tipo de trança</span>
          <SelectComponent
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>
        <button className="bg-marromsecundary hover:bg-yellow-900/80 transition-colors p-4 text-branconeutro text-xl max-md:text-sm rounded-xl">
          Quero Recomendação
        </button>
      </div>

      <div className="w-11/12 mt-32">
        {loading ? (
          <div className="h-96">
            <Loading />
          </div>
        ) : (
          <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
            {services.length > 0 ? (
              services.map((service) => (
                <ServiceCard
                  key={service.id}
                  foto={
                    service?.imagemUrl ||
                    "https://res.cloudinary.com/dt5smeslb/image/upload/v1743892304/servicos/fia65bmkbcxd7pkxqrhy.png"
                  }
                  titulo={service.nome}
                  valorSinal={service.valorSinal}
                  valorMinimo={service.valorMinimoServico}
                  valorMaximo={service.valorMaximoServico}
                  showTooltip
                />
              ))
            ) : (
              <p className="text-gray-500 text-center">
                Nenhum serviço encontrado.
              </p>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ServicosPage;
