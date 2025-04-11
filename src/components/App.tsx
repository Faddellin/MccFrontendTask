import React from "react"

import GreenButtonC from "./Buttons/GreenButtonC";
import NodeC from "./Node";
import { Node } from "../models/Node/Node";

interface AppProps{

}
const App: React.FC<AppProps> = 
	({

	}) => {

	let listOfNodes : Array<Node> = [{id:0,name:"1",arrayOfChilds:[{id:2,name:"3",arrayOfChilds:[]},{id:4,name:"5",arrayOfChilds:[]}]},{id:1,name:"2",arrayOfChilds:[{id:3,name:"4",arrayOfChilds:[]}]}]

	return (
		<div className="MainPage">
			<div className="TreeContainer">
				<div className="TreeHeader">
					<span>Tree</span>
				</div>
				<div className="Tree">
					{listOfNodes.map(child => 
						<NodeC key={child.id} nodeP={child}/>
					)}
				</div>
				<div className="TreeWorkingArea">
					<GreenButtonC buttonTextP="Add" onClickP={() => console.log("ckecj")}></GreenButtonC>
					<GreenButtonC buttonTextP="Remove" onClickP={() => console.log("ckecj")}></GreenButtonC>
					<GreenButtonC buttonTextP="Edit" onClickP={() => console.log("ckecj")}></GreenButtonC>
					<GreenButtonC buttonTextP="Reset" onClickP={() => console.log("ckecj")}></GreenButtonC>
				</div>
			</div>
		</div>
	);
}


export default App
