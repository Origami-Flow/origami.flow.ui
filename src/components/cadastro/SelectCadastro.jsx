import clsx from "clsx";
import { forwardRef } from "react";

const SelectCadastro = forwardRef(
  (
    {
      name,
      value,
      onChange,
      options = [],
      bgColor = "bg-roseprimary",
      color = "white",
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx("relative justify-center", bgColor)}>
        <label
          htmlFor={name}
          className={clsx(
            "absolute left-3 px-1 transform -translate-y-1/2 text-sm transition-all",
            "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400",
            "peer-focus:top-2 peer-focus:text-sm",
            `text-${color}`,
            bgColor,
          )}
        >
          {name}
        </label>
        <select
          ref={ref}
          id={name}
          value={value}
          onChange={onChange}
          {...props}
          className={clsx(
            "placeholder-slate-300 rounded-none block px-3 pb-2.5 pt-3 w-[20vw] bg-transparent border appearance-none focus:outline-none transition-all ease-in-out duration-1000",
            `text-${color}`,
            `border-${color}`,
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

export default SelectCadastro;
