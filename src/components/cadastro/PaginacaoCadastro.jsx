import clsx from "clsx";
import Button from "../shared/Button";
import ItemPaginacao from "./ItemPaginacao";

const PaginacaoCadastro = ({ faseAtual, setFaseAtual, validate, fase, handlerCadastrar }) => {
  return (
    <div className="w-screen">
      <div className="w-1/2 justify-between flex items-center m-auto">
        <Button
          className={clsx(
            "bg-roseprimary text-white w-44 px-4 py-1 rounded-full",
            faseAtual == 0 && "invisible pointer-events-none",
          )}
          onClick={() => setFaseAtual((prev) => prev - 1)}
        >
          Voltar
        </Button>

        <div className="flex gap-4">
          <ItemPaginacao
            pagina={0}
            atual={faseAtual}
            onClick={() => setFaseAtual(0)}
          />
          <ItemPaginacao
            pagina={1}
            atual={faseAtual}
            onClick={() => validate(0) && fase >=0 && setFaseAtual(1)}
          />
          <ItemPaginacao
            pagina={2}
            atual={faseAtual}
            onClick={() => validate(1) && fase >=1 && setFaseAtual(2)}
          />
          <ItemPaginacao
            pagina={3}
            atual={faseAtual}
            onClick={() => validate(2) && fase >=2 && setFaseAtual(3)}
          />
        </div>
        {faseAtual != 3 ? (
          <Button
            className="bg-roseprimary text-white w-44 px-4 py-1 rounded-full"
            onClick={() => validate(faseAtual) && setFaseAtual((prev) => prev + 1)}
          >
            Avançar
          </Button>
        ) : (
          <Button
            className="bg-marromsecundary text-white w-44 px-4 py-1 rounded-full"
            onClick={() => handlerCadastrar()}
          >
            Cadastrar
          </Button>
        )}
      </div>
    </div>
  );
};

export default PaginacaoCadastro;
