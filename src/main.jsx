import { Theme } from "@radix-ui/themes";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Theme>
      <App />
    </Theme>
  </React.StrictMode>
);
