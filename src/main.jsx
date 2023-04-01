import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss";

import ThemeSwitcher from "./context/Theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeSwitcher>
      <App />
    </ThemeSwitcher>
  </React.StrictMode>
);
