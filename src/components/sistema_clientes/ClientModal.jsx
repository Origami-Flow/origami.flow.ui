const ClientModal = ({ onClose, clientData }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg max-md:w-[80%]">
                <h2 className="text-xl font-bold mb-4 text-black">Informações adicionais</h2>
                <div className="flex items-center mb-4">
                    <img
                        src={clientData.foto}
                        alt="Foto do Cliente"
                        className="w-24 h-24 rounded-full mr-4"
                    />
                    <div>
                        <h3 className="text-lg font-semibold text-black">{clientData.nome || "Não informado"}</h3>
                        <p className="text-black">{clientData.email || "Não informado"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="font-semibold text-black">Data de nascimento</p>
                        <p className="text-black">{clientData.dataNascimento || "00/00/0000"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Endereço</p>
                        <p className="text-black">{clientData.endereco || "Não informado"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Ocupação</p>
                        <p className="text-black">{clientData.ocupacao || "Não informado"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Telefone</p>
                        <p className="text-black">{clientData.telefone || "Não informado"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Fez progressiva nos últimos 30 dias?</p>
                        <p className="text-black">{clientData.fezProgressiva ? "Sim" : "Não"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Primeira vez trançando?</p>
                        <p className="text-black">{clientData.primeiraVez ? "Sim" : "Não"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Tipo de cabelo</p>
                        <p className="text-black">{clientData.tipoCabelo || "Não informado"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Cor de cabelo</p>
                        <p className="text-black">{clientData.corCabelo || "Não informado"}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-black">Tamanho do cabelo</p>
                        <p className="text-black">{clientData.tamanhoCabelo || "Não informado"}</p>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="bg-marromsecundary text-white px-6 py-2 rounded-md"
                        onClick={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ClientModal;