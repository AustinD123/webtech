import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "typeface-roboto-mono";
import AuthPage from "./login.js";

ReactDOM.render(
  <React.StrictMode>
    <AuthPage />
  </React.StrictMode>,
  document.getElementById("root")
);
