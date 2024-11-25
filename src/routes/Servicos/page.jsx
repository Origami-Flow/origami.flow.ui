import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header";
import Menu from "@/components/shared/Menu";
import vetor from "../../assets/vetor-servicos.svg";
import imgPrincipal from "../../assets/principal-servicos.svg";
import { SelectComponent } from "@/components/servicos/SelectComponent";
import ServiceCard from "@/components/servicos/ServiceCard";
import Loading from "../../components/shared/Loading";
import { useEffect, useState } from "react";
import { TrashIcon } from "@radix-ui/react-icons";
import ServiceDialog from "@/components/servicos/ServiceDialog";
import { request } from "@/axios/request";
import fotos from "./fotos";
import usePagination from "@/hooks/usePagination";
import PaginacaoServico from "@/components/servicos/PaginacaoServico";

const ServicosPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedType, setSelectedType] = useState('todos');
    const [file, setFile] = useState(null);
    const {
        actualPage,
        getItemsPage,
        handleBackPage,
        handleNextPage,
        totalPages,
        setActualPage
    } = usePagination(services, 8);


    useEffect(() => {
        const fetchServicos = async () => {
            setLoading(true);
            try {
                const response = await request.getServicos();
                const servicesWithImages = response.data.map((service) => ({
                    ...service,
                    foto: fotos[service.descricao.toLowerCase()] || fotos["default"],
                }));
                setServices(servicesWithImages);
            } catch (err) {
                console.log('Erro ao buscar os serviços', err);
            } finally {
                setLoading(false);
            }
        };

        fetchServicos();
    }, []);

    const filteredServices = selectedType === 'todos'
        ? getItemsPage()
        : getItemsPage().filter(service =>
            service?.nome?.toLowerCase().includes(selectedType.toLowerCase())
        );

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

    const handlePageChange = (value) => {
        setActualPage(value);
    };

    return (
        <main className="flex flex-col items-center justify-start relative pt-36 max-md:pt-36 max-lg:pt-36">
            <Header />
            <Menu />
            <div className="w-11/12 flex flex-col space-y-16">
                <span className="font-laisha text-5xl text-marromsecundary max-md:text-4xl">Serviços</span>
                <div className="flex flex-col h-28 justify-between">
                    <p className="text-2xl max-md:text-xl">Já tem uma referência?</p>
                    <div className="flex">
                        <input className="block w-[50%] max-sm:w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file" onChange={handleFileChange} />

                        {file && (
                            <button onClick={handleRemoveFile} className="text-marromsecundary">
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
            <img src={vetor} alt="" className="absolute right-0 top-0 z-0 h-[85vh] max-md:h-[30vh] max-lg:h-[50vh]" />
            <img src={imgPrincipal} alt="" className="absolute right-[5%] top-0 z-10 h-[75vh] max-md:hidden max-lg:h-[50vh]" />

            <div className="w-11/12 mt-32 space-y-6">
                <div className="space-y-6 flex flex-col w-[50%] max-lg:w-full">
                    <span className="text-xl">Tipo de trança</span>
                    <SelectComponent selectedType={selectedType} setSelectedType={setSelectedType} />
                </div>
                <button className="bg-marromsecundary hover:bg-yellow-900/80 transition-colors p-4 text-branconeutro text-xl max-md:text-sm rounded-xl">Quero Recomendação</button>
            </div>

            <div className="w-11/12 mt-32">
                {loading ? (
                    <div className="h-96">
                        <Loading />
                    </div>
                ) : (
                    <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-4">
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service) => (
                                <ServiceCard
                                    key={service.id}
                                    foto={service.foto}
                                    titulo={service.nome}
                                    valorSinal={service.valorSinal}
                                    valorMinimo={service.valorServico}
                                    valorMaximo={service.valorServico}
                                    showTooltip
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Nenhum serviço encontrado.</p>
                        )}

                    </div>
                )}
            </div>
            <PaginacaoServico
                totalPages={totalPages}
                currentPage={actualPage}
                handleBackPage={handleBackPage}
                handleNextPage={handleNextPage}
                onPageChange={handlePageChange} />
            <Footer />
        </main>
    )
}

export default ServicosPage;