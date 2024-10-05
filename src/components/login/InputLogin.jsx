const InputLogin = (
    // { type, name, placeholder, value, onChange }
) => {
  return (
    <>
      <div className="relative justify bg-roseprimary">
        <label
          htmlFor="email"
          className="absolute text-white left-3 px-1 bg-roseprimary transform -translate-y-1/2 text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className=" border-white rounded-none block px-3 pb-2.5 pt-3 w-[20vw] text-white bg-transparent border appearance-none focus:outline-none focus:ring-0 peer" />
      </div>
      <div className="relative flex-col justify mt-6 bg-roseprimary">
          <label htmlFor="senha" className="absolute text-white left-3 px-1 bg-roseprimary transform -translate-y-1/2 text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm">
            Senha
          </label>
          <input type="password" id="senha" className=" border-white rounded-none block px-3 pb-2.5 pt-3 w-[20vw] text-white bg-transparent border appearance-none focus:outline-none focus:ring-0 peer" />
        </div>
    </>
  );
};

export default InputLogin;
