import { request } from "@/axios/request";
import Button from "@/components/shared/Button";
import useUser from "@/hooks/useUser";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IconeGoogle from "../../assets/icon-google.svg";
import ImageLogin from "../../assets/icon-login.svg";
import Header from "../../components/shared/Header";
import InputFormulario from "../../components/shared/InputFormulario";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUsuario } = useUser();

  const handleSubmit = () => {
    request.postLogin({ email, senha: password })
      .then((response) => {
        const resposta = response.data;
        localStorage.setItem("token", resposta.token);
        toast.success("Login efetuado com sucesso");
        setUsuario(resposta);

        if(resposta.authorities?.includes("ROLE_ADMIN")){
          navigate("/agendamentos");
        } else{ 
          navigate("/");
        }
      })
      .catch(() => {
        toast.error("Usuário ou senha inválidos");
      });
  };

  return (
    <main className="h-screen">
      <Header />
      <div className="flex h-full">
        <div className="w-1/2 h-full flex flex-col justify-between">
          <div className="h-[67.8%]">
            <div className="flex items-center justify-center h-[120%]">
              <p className="text-left text-6xl leading-[0.9] font-laisha ">
                Seja
                <br />
                bem
                <br />
                vindo
                <br />
                de volta!
              </p>
            </div>
          </div>

          <img src={ImageLogin} className="w-[110%] " alt="Imagem de Login" />
        </div>
        <div className="w-1/2 bg-roseprimary flex flex-col justify-center items-center gap-10">
          <div className="flex flex-col justify-center gap-6 items-center w-full">
            <InputFormulario
              color="white"
              name={"E-mail"}
              onChange={(e) => setEmail(e.target.value)}
              type={"email"}
              placeholder={"nome@mail.com"}
            />
            <InputFormulario
              color="white"
              name={"Senha"}
              onChange={(e) => setPassword(e.target.value)}
              type={"password"}
              placeholder={"*******"}
            />
          </div>

          <button className=" justify-center bg-white border rounded-full w-[30%] h-[7%]">
            <img className="w-[20%]" src={IconeGoogle} alt="Icone Google" />
          </button>
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-white">
              Não possui uma conta? &nbsp;
              <Link to={"/cadastro"}>
                <u>
                  <b>Cadastre-se</b>
                </u>
              </Link>
            </h1>

            <Button onClick={() => handleSubmit()} className="justify-center text-white bg-verdeprimary rounded-xl w-[25%] h-12">
              <b>Entrar</b>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;
