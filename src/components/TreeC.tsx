import React, { Fragment, memo, use, useMemo, useState } from "react"
import { Node } from "../models/Node/Node"
import { useTreeLogic } from "../hooks/useTreeLogic"
import NodeC from "./NodeC"

interface TreeProps{

}
const TreeC: React.FC<TreeProps> =
	({

	}) => {

		const {arrayOfNodes} = useTreeLogic();
	
	return (
		<React.Fragment>
			{arrayOfNodes.map(child => 
				<NodeC key={child.id} nodeP={child}/>
			)}
		</React.Fragment>
	);

};


export default TreeC
