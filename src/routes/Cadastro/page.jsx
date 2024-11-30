import blobBotton from "@/assets/blob-botton.svg";
import blobTop from "@/assets/blob-top.svg";
import { request } from "@/axios/request";
import CorCabeloContent from "@/components/cadastro/CorCabeloContent";
import GeneroContent from "@/components/cadastro/GeneroContent";
import InformacoesContent from "@/components/cadastro/InformacoesContent";
import PaginacaoCadastro from "@/components/cadastro/PaginacaoCadastro";
import TipoCabeloContent from "@/components/cadastro/TipoCabeloContent";
import Header from "@/components/shared/Header";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

const Page = () => {
  const [fase, setFase] = useState(0);
  const [faseAtual, setFaseAtual] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    if (fase < faseAtual) {
      setFase(faseAtual);
    }
  }, [faseAtual]);

  const [value, setValue] = useState({
    nome: "",
    email: "",
    senha: "",
    dataNascimento: "",
    telefone: "",
    ocupacao: "",
    cep: "",
    genero: "",
    tipoCabelo: "",
    corDoCabelo: "",
    confirmacaoSenha: "",
    possuiProgressiva: "",
    primeiraVezTrancando: "",
  });

  const inputValidation = z
    .object({
      nome: z
        .string()
        .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
      email: z.string().email({ message: "Email inválido" }),
      dataNascimento: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, {
          message: "Data de nascimento inválida",
        }),
      senha: z
        .string()
        .min(8, { message: "Senha deve ter pelo menos 8 caracteres" }),
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
      request.postCadastro({
        nome: value.nome,
        email: value.email,
        senha: value.senha,
        dataNascimento: value.dataNascimento,
        telefone: value.telefone,
        ocupacao: value.ocupacao,
        cep: value.cep,
        genero: value.genero,
        tipoCabelo: value.tipoCabelo,
        corCabelo: value.corDoCabelo,
      }).then(() => {
        toast.success("Cadastro realizado com sucesso!");

        setTimeout(() => {
          navigate("/login");
        }, 2000);
        
      }).catch(() => {
        toast.error("Não foi possível realizar o cadastro, tente novamente mais tarde");
      })
    } else {
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
      titulo: "Informações pessoais",
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
    const currentValidation = validations[etapa];

    if (currentValidation && currentValidation.condition) {
      setErrorMessage(currentValidation.message);
      return false;
    }

    return true;
  };
  return (
    <>
      <div className="relative min-h-screen">
        <img className="absolute top-0 left-0 -z-10" src={blobTop} alt="" />

        <Header />

        <div className="flex flex-col pt-24 gap-4 items-center min-h-[95vh] h-full">
          <h1 className="font-laisha text-4xl text-center">
            Queremos te conhecer!
          </h1>

          <div className="text-2xl h-[80%] gap-5 text-center flex w-5/6 flex-col  justify-between items-center ">
            <p className="w-56">{itemFase[faseAtual]?.titulo}</p>
            {itemFase[faseAtual].componente}
            <div className="flex w-full flex-col items-center">
              <p
                className={clsx(
                  "text-roseprimary font-semibold pb-2",
                  error == "" && "hidden"
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

        <img className="bottom-0 absolute right-0 -z-10" src={blobBotton} alt="" />
      </div>
    </>
  );
};
export default Page;
