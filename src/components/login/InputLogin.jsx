const InputLogin = ({ type, name, placeholder, value, onChange, ...props}) => {
  return (
    <>
      <div className="relative justify-center bg-roseprimary">
        <label
          htmlFor={name}
          className="absolute text-white left-3 px-1 bg-roseprimary transform -translate-y-1/2 text-sm peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm"
        >
          {name}
        </label>
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          className=" border-white rounded-none block px-3 pb-2.5 pt-3 w-[20vw] text-white bg-transparent border appearance-none focus:outline-none focus:ring-0 peer"
        />
      </div>
 
    </>
  );
};

export default InputLogin;
