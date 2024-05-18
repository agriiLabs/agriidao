import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/Context";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode> 
      <AuthProvider>
      <App />
      <ToastContainer/>
    </AuthProvider> 
    </React.StrictMode> 
  );
} else {
  console.error("Failed to find the root element!");
}
