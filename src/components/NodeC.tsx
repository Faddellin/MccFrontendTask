import React, { memo, use, useMemo, useState } from "react"
import { Node } from "../models/Node/Node"
import { useTreeLogic } from "../hooks/useTreeLogic"
import TextInputC from "./TextInputs/TextInputC"

interface NodeProps{
	nodeP: Node
}
const NodeC: React.FC<NodeProps> = memo(
	({
		nodeP
	}) => {

	const [isSelected, setIsSelected] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const { makeNewNodeSelected } = useTreeLogic();

	const onNodeClick = () => {
		if(!isSelected){
			makeNewNodeSelected(nodeP, setIsSelected, isEditing, setIsEditing);
			setIsSelected(true);
		}
	}

	const onNodeNameEdit = (newName: string) => {
		nodeP.name = newName;
	}

	return (
		<div className="NodeContainer">
			
			<div className="NodeHandler">
				<div className="NodeConnectionVerticalLine"></div>
				<div className="NodeConnectionHorizontalLine"></div>
				
				<div className={"NodeText" + (isSelected ? " Selected" : "")} onClick={onNodeClick} >
					
					{
						isEditing ? <TextInputC inputTextP={nodeP.name} setParentValueFromInputP={onNodeNameEdit}/> :
						<span>{nodeP.name}</span>
					}
				</div>
			</div>
			
			{nodeP.arrayOfChilds.map(child => 
				<NodeC key={child.id} nodeP={child}/>
			)}
		</div>
	);
});


export default NodeC
