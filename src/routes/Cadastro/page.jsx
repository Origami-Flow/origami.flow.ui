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
import { date, z } from "zod";

const Page = () => {
  const [fase, setFase] = useState(0);
  const [faseAtual, setFaseAtual] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (fase < faseAtual) {
      setFase(faseAtual);
    }
  }, [faseAtual]);

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

  const inputValidation = z
    .object({
      nome: z
        .string()
        .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
      email: z.string().email({ message: "Email inválido" }),
      dataNascimento: z.string().regex( /^\d{4}-\d{2}-\d{2}$/,{ message: "Data de nascimento inválida" }),
      senha: z
        .string()
        .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
      confirmacaoSenha: z.string(),
      telefone: z
        .string()
        .min(11, { message: "Telefone deve ter pelo menos 11 caracteres" }),
      ocupacao: z
        .string()
        .min(3, { message: "Ocupação deve ter pelo menos 3 caracteres" }),
      primeiraVezTrancando: z.boolean({ message: "Selecione uma opção" }),
      possuiProgressiva: z.boolean({ message: "Selecione uma opção" }),
      cep: z
        .string()
        .min(8, { message: "CEP deve ter pelo menos 8 caracteres" }),
    })
    .refine((data) => data.senha === data.confirmacaoSenha, {
      message: "A confirmação de senha deve ser igual à senha",
      path: ["confirmacaoSenha"],
    });

  const handlerValidateInputs = (field) => {
    const result = validateInputs(field);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: result,
    }));
  };

  const validarFormulario = (dados) => {
    try {
      const validatedData = inputValidation.parse(dados);
      return { success: true, data: validatedData };
    } catch (error) {
      return { success: false, errors: error.errors };
    }
  };

  const handlerCadastrar = () => {
    const validationResult = validarFormulario(value);
    if (validationResult.success) {
      console.log("Cadastro realizado com sucesso!");
      
    } else {
      console.log("Erro ao realizar cadastro:", validationResult.errors);
      
      const newErrors = {};
      validationResult.errors.forEach((error) => {
        const fieldName = error.path[0]; 
        newErrors[fieldName] = error.message; 
      });
      setErrors((prevErrors) => ({
        ...prevErrors,
        ...newErrors, 
      }));
    }
  };

  const validateInputs = (key) => {
    if (key in value) {
      const result = inputValidation.safeParse(value);
      if (result.success) {
        return "";
      } else {
        const error = result.error.errors.find((err) => err.path[0] === key);
        return error ? error.message : "";
      }
    }
  };

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
      componente: (
        <InformacoesContent
          value={value}
          setValue={setValue}
          validateInputs={validateInputs}
          handlerValidate={handlerValidateInputs}
          errors={errors}
        />
      ),
    },
  ];

  const [error, setError] = useState("");

  const setErrorMessage = (message) => {
    setError(message);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const validate = (etapa) => {
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
    console.log(validations);
    console.log(etapa);
    const currentValidation = validations[etapa];
    console.log(currentValidation);
    console.log(currentValidation?.condition);

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
                error == "" && "hidden",
              )}
            >
              {error}
            </p>
            <PaginacaoCadastro
              validate={validate}
              setFaseAtual={setFaseAtual}
              faseAtual={faseAtual}
              fase={fase}
              handlerCadastrar={handlerCadastrar}
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
export default Page;