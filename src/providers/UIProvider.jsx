import { Theme } from "@radix-ui/themes";
import { ParallaxProvider } from "react-scroll-parallax";

const UIProvider = ({ children }) => {
  return (
    <Theme>
      <ParallaxProvider>{children}</ParallaxProvider>
    </Theme>
  );
};
export default UIProvider;
