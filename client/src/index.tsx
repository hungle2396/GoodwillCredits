import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import "./style/custom.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./redux/store";


const el = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(el);

root.render(
    <Provider store={store}>
        <App />
        <ToastContainer />
    </Provider>
);