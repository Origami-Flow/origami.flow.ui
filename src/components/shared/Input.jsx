import clsx from "clsx";
import React from "react";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={clsx(
        "flex bg-transparent text-black p-2 border-2 border-gray-300 rounded-xl text-sm ",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
export default Input;
