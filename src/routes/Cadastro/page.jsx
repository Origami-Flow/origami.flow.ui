import blobBotton from "@/assets/blob-botton.svg";
import blobTop from "@/assets/blob-top.svg";
import CorCabeloContent from "@/components/cadastro/CorCabeloContent";
import GeneroContent from "@/components/cadastro/GeneroContent";
import InformacoesContent from "@/components/cadastro/InformacoesContent";
import PaginacaoCadastro from "@/components/cadastro/PaginacaoCadastro";
import TipoCabeloContent from "@/components/cadastro/TipoCabeloContent";
import Header from "@/components/shared/Header";
import clsx from "clsx";
import { useEffect, useState } from "react";

const page = () => {
  const [fase, setFase] = useState(0);
  const [faseAtual, setFaseAtual] = useState(0);

  useEffect(() => {
    if (fase < faseAtual) {
      setFase(faseAtual);
    }
  }, [faseAtual]);
  // const inputRefs = {
  //   nome: useRef(),
  //   email: useRef(),
  //   senha: useRef(),
  //   confirmacaoSenha: useRef(),
  //   telefone: useRef(),
  //   dataNascimento: useRef(),
  //   possuiProgressiva: useRef(),
  //   primeiraVezTrancando: useRef(),
  //   ocupacao: useRef(),
  //   cep: useRef(),
  // };
  const [value, setValue] = useState({
    genero: "",
    nome: "",
    tipoCabelo: "",
    corDoCabelo: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
    telefone: "",
    dataNascimento: "",
    possuiProgressiva: "",
    primeiraVezTrancando: "",
    ocupacao: "",
    cep: "",
  });

  const itemFase = [
    {
      titulo: "Selecione seu gênero",
      componente: <GeneroContent value={value} setValue={setValue} />,
    },
    {
      titulo: "Selecione seu tipo de cabelo",
      componente: <TipoCabeloContent value={value} setValue={setValue} />,
    },
    {
      titulo: "Selecione a cor do seu cabelo",
      componente: <CorCabeloContent value={value} setValue={setValue} />,
    },
    {
      titulo: "Selecione a cor do seu cabelo",
      componente: <InformacoesContent value={value} setValue={setValue} />,
    },
  ];
  const [error, setError] = useState("");

  const setErrorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const validate = () => {
    const validations = [
      {
        condition: value.genero === "",
        message: "Por favor, selecione um gênero",
      },
      {
        condition: value.tipoCabelo === "",
        message: "Por favor, selecione o tipo do seu cabelo",
      },
      {
        condition: value.corDoCabelo === "",
        message: "Por favor, selecione a cor do seu cabelo",
      },
    ];

    const currentValidation = validations[faseAtual];
    if (currentValidation && currentValidation.condition) {
      setErrorMessage(currentValidation.message);
      return false;
    }

    return true;
  };
  return (
    <>
      <img className="absolute top-0 left-0 -z-10" src={blobTop} alt="" />

      <Header />

      <div className="flex flex-col pt-32 gap-10 items-center h-screen">
        <h1 className="font-laisha text-4xl text-center">
          Queremos te conhecer!
        </h1>

        <div className="text-2xl text-center h-5/6 flex w-5/6 justify-between flex-col items-center ">
          <p className="w-56">{itemFase[faseAtual]?.titulo}</p>
          {itemFase[faseAtual].componente}
          <div className="flex flex-col items-center">
            <p
              className={clsx(
                "text-roseprimary font-semibold pb-2",
                error == "" && "hidden"
              )}
            >
              {error}
            </p>
            <PaginacaoCadastro
              validate={() => validate()}
              setFaseAtual={setFaseAtual}
              faseAtual={faseAtual}
              fase={fase}
            />
          </div>
        </div>
      </div>

      <img
        className="bottom-0 absolute right-0 -z-10"
        src={blobBotton}
        alt=""
      />
    </>
  );
};
export default page;
