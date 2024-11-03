import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/Context";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { AppKitProvider } from "./components/agriidao/AppKitProvider";

const rootElement = document.getElementById("root");
if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <AppKitProvider>
        <Provider store={store}>
        <AuthProvider>
          <App />
          <ToastContainer />
        </AuthProvider>
      </Provider>
      </AppKitProvider>   
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element!");
}
