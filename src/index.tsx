import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const firebaseConfig = {
  apiKey: "AIzaSyAObGMTlQhtDzdDiO8ygNMDd7rXYkuaXI0",
  authDomain: "test-project-96455.firebaseapp.com",
  projectId: "test-project-96455",
  storageBucket: "test-project-96455.appspot.com",
  messagingSenderId: "325982930563",
  appId: "1:325982930563:web:f6b9c1c35c33baf5d3bdb6",
  measurementId: "G-LTH4VFETKQ",
};

const app = initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const auth = getAuth(app);
