import AccordionComponent from "@/components/cuidados_pos_tranca/Accordion";
import CarouselComponent from "@/components/cuidados_pos_tranca/Carousel";
import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header";
import Menu from "@/components/shared/Menu";


const CuidadosPage = () => {
    return (
        <main className="flex flex-col items-center justify-start relative pt-32 max-md:pt-36 max-lg:pt-36">
            <Header />
            <Menu />
            <div className="flex flex-col justify-evenly w-11/12 space-y-6">
                <span className="font-laisha text-marromsecundary text-4xl">Cuidados pós trança</span>
                <p className="leading-relaxed">Após o processo de trançar, é essencial seguir alguns cuidados especiais para garantir que seus cabelos permaneçam saudáveis, hidratados e bonitos. O trançado pode ser uma forma poderosa de proteção e estilo, mas, para prolongar seus benefícios e evitar danos, algumas práticas simples podem fazer toda a diferença. Nesta sessão, você encontrará dicas valiosas de manutenção e produtos recomendados para preservar a saúde dos fios enquanto aproveita sua nova trança.</p>
            </div>

            <div className="flex flex-col w-11/12 mt-20 items-center space-y-6">
                <span className="font-laisha text-2xl text-marromsecundary self-start">Como lavar?</span>
                <CarouselComponent />
            </div>

            <div className="w-[90%] mt-20 space-y-6">
                <span className="font-laisha text-2xl text-marromsecundary">Dicas para a hora de dormir</span>
                <AccordionComponent itemValue="item-1" titulo="Use uma touca de cetim ou seda" descricao="Essas toucas ajudam a proteger as tranças, reduzindo o atrito com o travesseiro, o que evita o frizz e mantém as tranças mais hidratadas e alinhadas." />
                <AccordionComponent itemValue="item-2" titulo="Travesseiro com fronha de cetim ou seda" descricao="Caso não goste de usar touca, opte por fronhas de cetim ou seda, que oferecem proteção semelhante, reduzindo o desgaste do cabelo." />
                <AccordionComponent itemValue="item-3" titulo="Prenda suavemente as tranças" descricao="Se suas tranças forem longas, você pode prendê-las em um coque frouxo ou dividi-las em duas partes e trançá-las novamente de forma leve. Isso evita que elas se embaracem ou fiquem presas durante a noite." />
                <AccordionComponent itemValue="item-4" titulo="Hidratação noturna" descricao="Mantenha seu couro cabeludo hidratado aplicando um óleo leve antes de dormir. Isso ajuda a evitar a secura e a coceira, especialmente se você estiver com tranças por um longo período." />
                <AccordionComponent itemValue="item-5" titulo="Mantenha as tranças alinhadas" descricao="Certifique-se de que as tranças estejam bem alinhadas antes de dormir. Isso evitará que elas amassem ou formem dobras que possam alterar a forma delas." />
            </div>

            <div className="w-11/12 flex flex-col mt-20 space-y-5">
                <span className="font-laisha text-xl text-marromsecundary">Ficou com duvídas?</span>
                <p className="leading-relaxed">Entre em contato com nossa equipe para receber mais dicas e orientações personalizadas. Juntos, vamos garantir que suas tranças continuem sendo uma expressão única de beleza e afeto.</p>
                <button className="bg-marromsecundary w-[20%] max-md:w-[50%] p-3 text-branconeutro text-lg rounded-xl">Entre em contato</button>
            </div> 

            <Footer />
        </main>
    )
}

export default CuidadosPage;