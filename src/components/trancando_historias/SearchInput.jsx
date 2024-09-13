import clsx from "clsx";
import { Search } from "lucide-react";
import Input from "../shared/Input";
import React, { forwardRef } from "react";

const SearchInput = forwardRef(({className ,...props}, ref) => {
  return (
    <div className="relative">
      <Input ref={ref} className={clsx("pr-8", className)} {...props} />
      <Search className="absolute top-0 right-2"height={"100%"} />
    </div>
  );
});
export default SearchInput;
