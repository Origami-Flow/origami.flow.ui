import clsx from "clsx";
import { Search } from "lucide-react";
import Input from "../shared/Input";
import React, { forwardRef } from "react";

const SearchInput = forwardRef(({onKeyDown,className ,...props}, ref) => {
  return (
    <div className="relative w-fit">
      <Input ref={ref} className={clsx("pr-8", className)} onKeyDown={onKeyDown} {...props} />
      <Search className="absolute top-0 right-2"height={"100%"} />
    </div>
  );
});
export default SearchInput;
