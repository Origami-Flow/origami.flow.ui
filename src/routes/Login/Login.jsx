import Header from "../../components/shared/Header";
import ImageLogin from "../../assets/icon-login.svg";

const Login = () => {
  return (
    <main className="h-screen">
      <Header />
      <div className="flex h-[100%]" >
        <div className="w-1/2 ">
          <div className=" h-[70%]">
          
          </div>
          <div>
            <img src={ImageLogin} alt="Imagem de Login" />
          </div>
        </div>
        

        <div className="w-1/2 bg-roseprimary ">

        </div>
      </div>
    </main>  
  );
};
export default Login;