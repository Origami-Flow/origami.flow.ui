import clsx from "clsx";
import React from "react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={clsx(
        "flex bg-transparent text-black p-2 border border-gray-300 rounded-2xl w-56 text-sm h-7",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
export default Input;
