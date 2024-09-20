import React from "react";
import ReactDOM from "react-dom/client";  // Import from 'react-dom/client' for createRoot
import "./index.css";
import App from "./App";
import reducer, { initialState } from "./reducer";
import { StateProvider } from "./StateProvider";

// Create a root element using createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

// Use root.render() instead of ReactDOM.render()
root.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>
);
