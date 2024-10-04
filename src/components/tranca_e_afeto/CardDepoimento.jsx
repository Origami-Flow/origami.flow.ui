export default function CardDepoimento({foto}){
    return(
        <div className="w-3/12 max-md:w-full flex flex-col items-center justify-evenly space-y-6">
            <img src={foto} alt="Imagem da pessoa do depoimento" className="w-2/3 h-2/3 max-md:w-[33%] rounded-full"/>
            <span className="text-2xl font-bold">Nome</span>
            <span className="text-xl text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eleifend, diam sagittis scelerisque bibendum, felis augue tincidunt lacus, in consectetur leo justo nec nisi.  </span>
        </div>
    )
} 