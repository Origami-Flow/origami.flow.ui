import clsx from "clsx";
import { Eye, EyeOffIcon } from "lucide-react";
import { forwardRef, useState } from "react";

const InputFormulario = forwardRef(
  (
    {
      type = "text",
      name,
      placeholder,
      value,
      onChange,
      bgColor = "bg-roseprimary",
      color = "white",
      ...props
    },
    ref
  ) => {
    const [inputType, setInputType] = useState(type);

    const togglePasswordVisibility = () => {
      setInputType((prevType) =>
        prevType === "password" ? "text" : "password"
      );
    };

    return (
      <div className={clsx("relative justify-center", bgColor)}>
        <label
          htmlFor={name}
          className={clsx(
            "absolute left-3 px-1 transform -translate-y-1/2 text-lg transition-all",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400",
            "peer-focus:top-2 peer-focus:text-lg",
            `text-${color}`,
            bgColor
          )}
        >
          {name}
        </label>
        <input
          ref={ref}
          type={inputType}
          id={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          className={clsx(
            "px-3 pb-2.5 pt-3 w-[20vw] bg-transparent focus:outline-none transition-all ease-in-out duration-1000",
            `border text-${color} border-${color} focus:ring-${color} focus:border-${color}`,
            color === "white" && "placeholder-slate-200",
            type === "password" && "pr-10"
          )}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-${color}`}
          >
            {inputType === "password" ? <EyeOffIcon /> : <Eye />}
          </button>
        )}
      </div>
    );
  }
);

export default InputFormulario;
