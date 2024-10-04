import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import imgNago from "../../assets/nago-capa-video.svg";
import imgBox from "../../assets/box-capa-video.svg";
import imgFaux from "../../assets/faux-capa-video.svg";
import imgBarrel from "../../assets/barrel-capa-video.svg";
import imgGypsy from "../../assets/gypsy-capa-video.svg";

const CarouselComponent = () => {
    const videos = [
        { titulo: "Gypsy Braids", url: "", capa: imgGypsy },
        { titulo: "Nagô", url: "", capa: imgNago },
        { titulo: "Box Braids", url: "", capa: imgBox },
        { titulo: "Barrel Twist", url: "", capa: imgBarrel },
        { titulo: "Faux Locs", url: "", capa: imgFaux }
    ]

    return (
        <Carousel className="w-[90%] max-h-fit">
            <CarouselContent className="-ml-1">
                {videos.map((item, index) => (
                    <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1 flex flex-col space-y-8 items-center">
                            <div className="flex h-fit justify-center object-cover overflow-hidden rounded-3xl">
                                <img src={item.capa} alt={item.titulo} className="w-auto h-auto transition-transform duration-300 ease-in-out hover:scale-110" />
                            </div>
                            <span className="text-xl">{item.titulo}</span>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

export default CarouselComponent;