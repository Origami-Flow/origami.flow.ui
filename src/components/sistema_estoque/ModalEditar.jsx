const ModalEditar = ({ onClose, nameProduct }) => {
    const campos = [
        {
            name: "Tipo",
            field: "tipo",
            placeholder: "",
            type: "select",
        },
        {
            name: "Nome do produto",
            field: "produto",
            placeholder: "Digite o nome do produto",
        },
        {
            name: "Preço de Compra (R$)",
            field: "precoCompra",
            placeholder: "Digite o preço de compra",
            type: "number",
        },
        {
            name: "Preço de Venda (R$)",
            field: "precoVenda",
            placeholder: "Digite o preço de venda",
            type: "number",
        },
        {
            name: "Quantidade por Embalagem",
            field: "quantidadeEmbalagem",
            placeholder: "ex: 300 (para 300ml)",
            type: "number",
        },
        {
            name: "Unidade de Medida",
            field: "unidadeMedida",
            placeholder: "ml, mg, gr",
        },
        {
            name: "Marca",
            field: "marca",
            placeholder: "Digite a Marca",
        },
        {
            name: "Unidades",
            field: "unidades",
            placeholder: "Digite a quantidade de produtos",
            type: "number",
        },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg max-md:w-[80%]">
                <h2 className="text-xl font-bold mb-4 text-black">Editar - {nameProduct}</h2>

                <div>

                </div>

                <div className="flex justify-end mt-6 space-x-3">
                    <button
                        className="bg-roseprimary text-white px-6 py-2 rounded-md"
                        onClick={onClose}>
                        Cancelar
                    </button>
                    <button
                        className="bg-marromsecundary text-white px-6 py-2 rounded-md"
                        onClick={onClose}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalEditar;