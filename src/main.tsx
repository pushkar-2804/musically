import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import KeyCloakService from "./security/KeyCloakService.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const renderApp = () =>
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
KeyCloakService.CallLogin(renderApp);
