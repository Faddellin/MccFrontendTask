import React, { useState } from "react"

import GreenButtonC from "./Buttons/GreenButtonC";
import NodeC from "./NodeC";
import { Node } from "../models/Node/Node";
import { TreeLogicProvider } from "../providers/TreeLogicProvider";
import { useTreeLogic } from "../hooks/useTreeLogic";
import { memo } from "react";
import TreeC from "./TreeC";


interface AppProps{

}
const App: React.FC<AppProps> = 
	({

	}) => {

	const {createNode, removeNode, resetTree, editNode, clearSelect} = useTreeLogic();

	const [editButtonText, setEditButtonText] = useState<string>("Edit");

	return (
		<div className="MainPage">
			<div className="TreeContainer">
				<div className="TreeHeader">
					<span>Tree</span>
				</div>
				
				<div className="Tree">
					<TreeC/>
				</div>
				
				<div className="TreeWorkingArea">
					<GreenButtonC buttonTextP="Add" onClickP={createNode}></GreenButtonC>
					<GreenButtonC buttonTextP="Remove" onClickP={removeNode}></GreenButtonC>
					<GreenButtonC buttonTextP={editButtonText} onClickP={() => editNode(setEditButtonText)}></GreenButtonC>
					<GreenButtonC buttonTextP="Reset" onClickP={resetTree}></GreenButtonC>
					<GreenButtonC buttonTextP="Clear select" onClickP={clearSelect}></GreenButtonC>
				</div>
			</div>
		</div>
	);
}


export default App
