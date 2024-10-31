import Header from "../../components/shared/Header";
import ImageLogin from "../../assets/icon-login.svg";
import IconeGoogle from "../../assets/icon-google.svg";
import InputFormulario from "../../components/shared/InputFormulario";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const gotoCadastro = () => {
    navigate('/cadastro');
  };

  return (
    <main className="h-screen">
      <Header />
      <div className="flex h-[100%]">
        <div className="w-1/2 ">
          <div className=" h-[67.8%]">
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
              name={"E-mail"}
              type={"email"}
              placeholder={"nome@mail.com"}
            />
            <InputFormulario
              name={"Senha"}
              type={"password"}
              placeholder={"*******"}
            />
          </div>

          <button className=" justify-center bg-white border rounded-full w-[30%] h-[7%]">
            <img className="w-[20%]" src={IconeGoogle} alt="Icone Google" />
          </button>
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-white">
              Não possui uma conta?{" "}
              <a onClick={gotoCadastro} className="cursor-pointer">
                <u>
                  <b>Cadastre-se</b>
                </u>
              </a>
            </h1>

            <button className="justify-center text-white bg-verdeprimary rounded-xl w-[25%] h-12">
              <b>Entrar</b>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;
