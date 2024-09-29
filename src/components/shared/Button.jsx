import clsx from "clsx";
import { forwardRef } from "react";

const Button = forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(
        className,
        "inline-flex items-center justify-center whitespace-nowrap rounded-[0.40rem] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90"
      )}
    >
      {props.children}
    </button>
  );
});

export default Button;
