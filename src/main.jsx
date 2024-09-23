import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header";
import "./index.css";
import Menu from '../src/components/Menu';


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Header />
    <Menu />
  </React.StrictMode>
);
