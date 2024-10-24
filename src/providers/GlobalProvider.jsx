import UIProvider from "./UIProvider";

const GlobalProvider = ({ children }) => {
  return <UIProvider>{children}</UIProvider>;
};
export default GlobalProvider;
