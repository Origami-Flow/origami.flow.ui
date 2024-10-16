import { Theme } from "@radix-ui/themes";
import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "@radix-ui/themes/styles.css";
import { ParallaxProvider } from "react-scroll-parallax";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme>
      <ParallaxProvider>
        <App />
      </ParallaxProvider>
    </Theme>
  </React.StrictMode>,
);
