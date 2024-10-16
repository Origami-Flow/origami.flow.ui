import InputFormulario from "../shared/InputFormulario";

const InformacoesContent = ({ value, setValue }) => {
  const handleChange = (field, newValue) => {
    setValue((prevValue) => ({
      ...prevValue,
      [field]: newValue,
    }));
  };

  const campos = [
    { name: "Nome", field: "nome", placeholder: "Digite seu Nome" },
    { name: "Email", field: "email", placeholder: "Digite seu Email" },
    {
      name: "Data de Nascimento",
      field: "dataNascimento",
      placeholder: "Digite sua Data de Nascimento",
      type: "date",
    },
    { name: "Telefone", field: "telefone", placeholder: "Digite seu Telefone" },
    {
      name: "Possui Progressiva?",
      field: "possuiProgressiva",
      placeholder: "Sim ou Não",
    },
    {
      name: "Primeira Vez Trançando?",
      field: "primeiraVezTrancando",
      placeholder: "Sim ou Não",
    },
    { name: "Ocupação", field: "ocupacao", placeholder: "Digite sua Ocupação" },
    { name: "CEP", field: "cep", placeholder: "Digite seu CEP" },
    {
      name: "Senha",
      field: "senha",
      placeholder: "Digite sua Senha",
      type: "password",
    },
    {
      name: "Confirmação de Senha",
      field: "confirmacaoSenha",
      placeholder: "Confirme sua Senha",
      type: "password",
    },
  ];

  const commonInputProps = {
    bgColor: "bg-white",
    color: "text-black",
  };

  return (
    <div className="grid grid-cols-2 gap-10">
      {campos.map(({ name, field, placeholder, type }) => (
        <InputFormulario
          key={field}
          name={name}
          value={value[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          type={type || "text"}
          {...commonInputProps}
        />
      ))}
    </div>
  );
};

export default InformacoesContent;
