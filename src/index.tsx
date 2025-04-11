import React, { createContext, useContext } from "react"
import {createRoot} from "react-dom/client";

import App from "./components/App"
import "./css/main.css"

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
	<App />
);