import { useState } from "react";
import InputFormulario from "../shared/InputFormulario";
import ReactInputMask from "react-input-mask";
import clsx from "clsx";
import SelectCadastro from "./SelectCadastro";

const InformacoesContent = ({ value, setValue, handlerValidate, errors }) => {

  const campos = [
    { name: "Nome", field: "nome", placeholder: "Digite seu Nome", mask: "" },
    {
      name: "Email",
      field: "email",
      placeholder: "Digite seu Email",
      mask: "",
    },
    {
      name: "Data de Nascimento",
      field: "dataNascimento",
      placeholder: "Digite sua Data de Nascimento",
      type: "date",
      mask: "",
    },
    {
      name: "Telefone",
      field: "telefone",
      placeholder: "Digite seu Telefone",
      mask: "(99) 99999-9999",
    },
    {
      name: "Possui Progressiva?",
      field: "possuiProgressiva",
      placeholder: "Sim ou Não",
      mask: "",
    },
    {
      name: "Primeira Vez Trançando?",
      field: "primeiraVezTrancando",
      placeholder: "Sim ou Não",
      mask: "",
    },
    {
      name: "Ocupação",
      field: "ocupacao",
      placeholder: "Digite sua Ocupação",
      mask: "",
    },
    {
      name: "CEP",
      field: "cep",
      placeholder: "Digite seu CEP",
      mask: "99999-999",
    },
    {
      name: "Senha",
      field: "senha",
      placeholder: "Digite sua Senha",
      type: "password",
      mask: "",
    },
    {
      name: "Confirmação de Senha",
      field: "confirmacaoSenha",
      placeholder: "Confirme sua Senha",
      type: "password",
      mask: "",
    },
  ];

  const handleChange = (field, newValue) => {
    if (field == "telefone" || field == "cep") {
      newValue = newValue.replace(/\D/g, "");
    }
    
    setValue((prevValue) => ({
      ...prevValue,
      [field]: newValue,
    }));
  };

  return (
    <div className="grid grid-cols-2 gap-8 m-5">
      {campos.map(({ name, field, placeholder, type, mask }) => (
        <div key={field} className="h-16">
          {mask === "" ? (
            <>
              {field === "possuiProgressiva" ||
              field === "primeiraVezTrancando" ? (
                <div>
                  <SelectCadastro
                    name={name}
                    onChange={(e) =>
                      handleChange(
                        field,
                        e.target.value == "true"
                          ? true
                          : e.target.value == "false"
                          ? false
                          : undefined,
                      )
                    }
                    options={[
                      { value: "", label: "Selecione uma opção" },
                      { value: true, label: "Sim" },
                      { value: false, label: "Não" },
                    ]}
                    onBlur={() => handlerValidate(field)}
                    bgColor={ "bg-white"}
                    color={clsx(errors[field] ? "red-500" : "black")}
                  />
                  {errors[field] && (
                    <div className="text-red-500 text-sm">
                      <p>{errors[field]}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <InputFormulario
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    value={value[field]}
                    onChange={(e) => handleChange(field, e.target.value)}
                    onBlur={() => handlerValidate(field)}
                    bgColor={ "bg-white"}
                    color={clsx(errors[field] ? "red-500" : "black")}
                  />
                  {errors[field] && (
                    <div className="text-red-500 text-sm">
                      <p>{errors[field]}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div>
              <ReactInputMask
                mask={mask}
                value={value[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                onBlur={() => handlerValidate(field)}
              >
                {(inputProps) => (
                  <InputFormulario
                    {...inputProps}
                    name={name}
                    placeholder={placeholder}
                    type={type}
                    bgColor={ "bg-white"}
                    color={clsx(errors[field] ? "red-500" : "black")}
                  />
                )}
              </ReactInputMask>
              {errors[field] && (
                <div className="text-red-500 text-sm">
                  <p>{errors[field]}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InformacoesContent;
