import { request } from "@/axios/request";
import { Minus, Plus, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ComboboxAgendamento from "./ComboboxAgendamentos"; // Ajuste o caminho conforme necessário
import Input from "../shared/Input";

const CompletarModal = ({ onClose, modalOpen, fetchEvents }) => {
  const [produtos, setProdutos] = useState([
    { id: null, quantidade: 1, finalidade: "UTILIZADO" },
  ]);

  const [valor, setValor] = useState("");

  const formatarParaReal = (valor) => {
    let valorNumerico = valor.replace(/\D/g, "");
    let valorFormatado = (parseInt(valorNumerico, 10) / 100).toFixed(2);

    if (isNaN(Number(valorFormatado))) return "R$ 0,00";

    return `R$ ${Number(valorFormatado).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const handleChange = (e) => {
    const valorDigitado = e.target.value;
    const valorFormatado = formatarParaReal(valorDigitado);
    setValor(valorFormatado);
  };

  const getValorNumerico = () => {
    const somenteNumeros = valor.replace(/\D/g, "");
    return parseInt(somenteNumeros || "0", 10) / 100;
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleAddProduto = () => {
    setProdutos([
      ...produtos,
      { id: null, quantidade: 1, finalidade: "UTILIZADO" },
    ]);
  };

  const handleProdutoChange = (index, field, value) => {
    const newProdutos = [...produtos];
    newProdutos[index][field] = value;
    setProdutos(newProdutos);
  };

  const handleRemoveProduto = (index) => {
    const newProdutos = produtos.filter((_, i) => i !== index);
    setProdutos(newProdutos);
  };

  const handleIncrementQuantidade = (index) => {
    const newProdutos = [...produtos];
    newProdutos[index].quantidade += 1;
    setProdutos(newProdutos);
  };

  const handleDecrementQuantidade = (index) => {
    const newProdutos = [...produtos];
    if (newProdutos[index].quantidade > 1) {
      newProdutos[index].quantidade -= 1;
      setProdutos(newProdutos);
    }
  };

  const handleSave = () => {
    const produtosUtilizadoRequestDTO = produtos.map((produto) => ({
      id: produto.id,
      quantidade: produto.quantidade,
      finalidade: produto.finalidade,
    }));
    request
      .putFinalizarEvento(modalOpen?.event?.id, produtosUtilizadoRequestDTO, getValorNumerico())
      .then(() => {
        toast.success("Produtos adicionados com sucesso!");
        fetchEvents();
        onClose();
      })
      .catch(() => {
        toast.error("Erro ao adicionar produtos");
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-lg max-md:w-[80%] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-7 text-black">
          Concluir agendamento
        </h2>
        <h1 className="text-lg font-semibold mb-4 text-black">
          Produtos utilizado:
        </h1>
        <div className="flex flex-col space-y-4 ">
          {produtos.map((produto, index) => (
            <div key={index} className="flex space-x-4 items-center">
              <ComboboxAgendamento
                placeholder={"Digite o produto"}
                width="full"
                fetchOptions={request.getProdutoNome}
                setBuscaId={(id) => handleProdutoChange(index, "id", id)}
                initialValue={produto.nome}
              />
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleDecrementQuantidade(index)}
                  className="p-1 border border-gray-300 rounded-lg"
                >
                  <Minus size={16} />
                </button>
                <input
                  placeholder="Quantidade"
                  value={produto.quantidade}
                  onChange={(e) => {
                    const value = e.target.value.replaceAll(/\D/g, "");
                    handleProdutoChange(
                      index,
                      "quantidade",
                      parseInt(value || 0)
                    );
                  }}
                  className="border border-gray-300 rounded-lg p-2 w-10 text-center"
                />
                <button
                  type="button"
                  onClick={() => handleIncrementQuantidade(index)}
                  className="p-1 border border-gray-300 rounded-lg"
                >
                  <Plus size={16} />
                </button>
              </div>
              <select
                value={produto.finalidade}
                onChange={(e) =>
                  handleProdutoChange(index, "finalidade", e.target.value)
                }
                className="border border-gray-300 rounded-lg p-2"
              >
                <option value="UTILIZADO">Utilizado</option>
                <option value="ACABOU">Acabado</option>
                <option value="VENDIDO">Vendido</option>
              </select>
              <button
                type="button"
                onClick={() => handleRemoveProduto(index)}
                className="p-1 border border-gray-300 rounded-lg text-red-500"
              >
                <Trash size={16} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleAddProduto}
          >
            Adicionar Produto
          </button>
        </div>
        <div className="mt-6 gap-4">
          <label htmlFor="valor" className="text-lg font-semibold  text-black">
            Valor Cobrado Agendamento:
          </label>
          <div className="flex justify-between p-1">
            <Input
              className="!text-base"
              id="valor"
              value={valor}
              onChange={handleChange}
              placeholder="R$ 0,00"
            />

            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Concluir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletarModal;
