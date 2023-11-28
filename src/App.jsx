import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GameCanvas from "./components/gameCanvas";
// import App from "./app.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GameCanvas />
  </React.StrictMode>
);
