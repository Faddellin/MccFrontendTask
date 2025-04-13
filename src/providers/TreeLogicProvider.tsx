import React, { createContext, ReactNode, useCallback, useRef, useState } from "react"
import { Dispatch, SetStateAction } from "react";
import { Node } from "../models/Node/Node";

interface TreeLogicContextType {
	makeNewNodeSelected: (node: Node, nodeFunctionToUnselect: Dispatch<SetStateAction<boolean>> | null,
		isEditing: boolean, nodeFunctionToEdit: Dispatch<SetStateAction<boolean>> | null) => void;
	createNode: () => void;
	removeNode: () => void;
	resetTree: () => void;
	editNode: () => void;
	assignEditButtonTextState: (setEditButtonText: Dispatch<SetStateAction<string>>) => void;
	clearSelect: () => void;
	arrayOfNodes: Array<Node>;
}

const TreeLogicContext = createContext<TreeLogicContextType | undefined>(undefined);

export const TreeLogicProvider = ({ children }: { children: ReactNode }) => {
	const [arrayOfNodes, setArrayOfNodes] = useState<Array<Node>>([]); 
	const currentNodeId = useRef<number>(0);
	const currentNode = useRef<Node>(null);

	const currentNodeFunctionToUnselect = useRef<Dispatch<SetStateAction<boolean>>>(null);
	const currentNodeFunctionToEdit = useRef<Dispatch<SetStateAction<boolean>>>(null);
	const currentNodeIsEditing = useRef<boolean>(false);

	const setEditButtonText = useRef<Dispatch<SetStateAction<string>>>(null);

	const createNode = useCallback(() => {
		const newNode: Node =
			{id: currentNodeId.current,
			name: `Node${currentNodeId.current}`,
			arrayOfChilds: []};
			
		currentNodeId.current++;

		setArrayOfNodes(oldNodes => {

			if (oldNodes.length == 0){
				return [newNode];
			}

			if(currentNode.current == null){
				return [...oldNodes, newNode];
			}

			const recursiveTreeUpdate = (childNodes: Array<Node>) : Array<Node> => {
				return childNodes.map(node => {
	
					if(node.id == currentNode.current?.id){
						return {id:node.id, name:node.name, arrayOfChilds:[...node.arrayOfChilds, newNode]};
					}
	
					if(node.arrayOfChilds.length != 0){
						return {id:node.id, name:node.name, arrayOfChilds:recursiveTreeUpdate(node.arrayOfChilds)};
					}
	
					return node;
	
				});
			}

			return recursiveTreeUpdate(oldNodes);
		});

	},[]);

	const removeNode = () => {
		setArrayOfNodes(oldNodes => {

			if (oldNodes.length == 0){
				return [];
			}

			if(currentNode.current == null){
				return oldNodes;
			}

			const recursiveTreeDelete = (childNodes: Array<Node>) : Array<Node> => {
				return childNodes.filter(node => {
					console.log(node);
					console.log(currentNode.current?.id);
					if(node.id == currentNode.current?.id){
						return false;
					}
	
					if(node.arrayOfChilds.length != 0){
						node.arrayOfChilds = recursiveTreeDelete(node.arrayOfChilds);
					}
	
					return true;
	
				});
			}

			return recursiveTreeDelete(oldNodes);
		});
		currentNode.current = null;
	}

	const resetTree = () => {
		setArrayOfNodes([]); 
		currentNodeId.current = 0;
		currentNode.current = null;
		currentNodeFunctionToUnselect.current = null;
	}

	const makeNewNodeSelected = (node: Node, nodeFunctionToUnselect: Dispatch<SetStateAction<boolean>> | null,
		isEditing: boolean, nodeFunctionToEdit: Dispatch<SetStateAction<boolean>> | null
	 ) => {

		if(currentNodeFunctionToUnselect.current != null){
			currentNodeFunctionToUnselect.current(false);
		}
		if(currentNodeFunctionToEdit.current != null){
			currentNodeFunctionToEdit.current(false);
			setEditButtonText.current!!("Edit");
		}
		currentNodeFunctionToUnselect.current = nodeFunctionToUnselect;
		currentNode.current = node;
		currentNodeFunctionToEdit.current = nodeFunctionToEdit;
		currentNodeIsEditing.current = isEditing;
	}

	const editNode = () =>{
		if (setEditButtonText.current == null){
			return;
		}
		if(currentNodeFunctionToEdit.current == null){
			return;
		}
		currentNodeIsEditing.current = !currentNodeIsEditing.current;
		currentNodeFunctionToEdit.current(currentNodeIsEditing.current);
		
		if (currentNodeIsEditing.current == true){
			setEditButtonText.current("Cancel");
		}else{
			setEditButtonText.current("Edit");
		}
	}

	const assignEditButtonTextState = (editButtonTextState: Dispatch<SetStateAction<string>>) =>{
		setEditButtonText.current = editButtonTextState;
	}

	const clearSelect = () =>{

		if(currentNodeFunctionToUnselect.current != null){
			currentNodeFunctionToUnselect.current(false);
		}
		if(currentNodeFunctionToEdit.current != null){
			currentNodeFunctionToEdit.current(false);
			setEditButtonText.current!!("Edit");
		}

		currentNodeFunctionToUnselect.current = null;
		currentNode.current = null;
		currentNodeFunctionToEdit.current = null;
		currentNodeIsEditing.current = false;
	}

	const value = {
		makeNewNodeSelected,
		createNode,
		removeNode,
		resetTree,
		editNode,
		assignEditButtonTextState,
		clearSelect,
		arrayOfNodes
	};

	return (
	  <TreeLogicContext.Provider value={value}>
		{children}
	  </TreeLogicContext.Provider>
	);
};

export default TreeLogicContext