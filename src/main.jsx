import "@radix-ui/themes/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import GlobalProvider from "./providers/GlobalProvider";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
);
