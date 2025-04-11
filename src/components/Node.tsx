import React from "react"
import { Node } from "../models/Node/Node"

interface NodeProps{
	nodeP: Node
}
const NodeC: React.FC<NodeProps> = 
	({
		nodeP
	}) => {


	return (
		<div className="NodeContainer">
			
			<div className="NodeHandler">
				<div className="NodeConnectionVerticalLine"></div>
				<div className="NodeConnectionHorizontalLine"></div>
				<div className="NodeText">{nodeP.name}</div>
			</div>
			
			{nodeP.arrayOfChilds.map(child => 
				<NodeC key={child.id} nodeP={child}/>
			)}
		</div>
	);
}


export default NodeC
