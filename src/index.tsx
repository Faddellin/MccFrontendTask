import React, { createContext, useContext } from "react"
import {createRoot} from "react-dom/client";

import App from "./components/App"
import "./css/main.css"

import { TreeLogicProvider } from "./providers/TreeLogicProvider";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);

root.render(
	<TreeLogicProvider>
		<App />
	</TreeLogicProvider>
	
);