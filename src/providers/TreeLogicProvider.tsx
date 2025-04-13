import React, { createContext, ReactNode, useCallback, useRef, useState } from "react"
import { Dispatch, SetStateAction } from "react";
import { Node } from "../models/Node/Node";

interface TreeLogicContextType {
	makeNewNodeSelected: (node: Node, nodeSetIsSelected: Dispatch<SetStateAction<boolean>> | null,
		isEditing: boolean, nodeSetIsEditing: Dispatch<SetStateAction<boolean>> | null) => void;
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
	const nodeIdSequence = useRef<number>(0);
	const currentNode = useRef<Node>(null);

	const currentNodeSetIsSelected = useRef<Dispatch<SetStateAction<boolean>>>(null);
	const currentNodeSetIsEditing = useRef<Dispatch<SetStateAction<boolean>>>(null);
	const currentNodeIsEditing = useRef<boolean>(false);

	const setEditButtonText = useRef<Dispatch<SetStateAction<string>>>(null);

	const createNode = () => {

		stopEditingIfEditing();

		const newNode: Node =
			{id: nodeIdSequence.current,
			name: `Node${nodeIdSequence.current}`,
			arrayOfChilds: []};
			
		nodeIdSequence.current++;

		const parentNode: Node | null = currentNode.current;

		setArrayOfNodes(oldNodes => {

			if (oldNodes.length == 0){
				return [newNode];
			}

			if(parentNode == null){
				return [...oldNodes, newNode];
			}

			const recursiveTreeUpdate = (childNodes: Array<Node>) : Array<Node> => {
				return childNodes.map(node => {
	
					if(node.id == parentNode?.id){
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

	};

	const removeNode = () => {

		const nodeToDelete: Node | null = currentNode.current;

		stopEditingIfEditing();
		unselectNodeIfSelected();

		setArrayOfNodes(oldNodes => {
			if (oldNodes.length == 0){
				return [];
			}

			if(nodeToDelete == null){
				return oldNodes;
			}
			const recursiveTreeDelete = (childNodes: Array<Node>) : Array<Node> => {
				return childNodes.filter(node => {
					if(node.id == nodeToDelete?.id){
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

		stopEditingIfEditing();
		unselectNodeIfSelected();

		nodeIdSequence.current = 0;
		currentNode.current = null;
		currentNodeSetIsSelected.current = null;
	}

	const makeNewNodeSelected = (node: Node, nodeSetIsSelected: Dispatch<SetStateAction<boolean>> | null,
		isEditing: boolean, nodeSetIsEditing: Dispatch<SetStateAction<boolean>> | null
	 ) => {

		unselectNodeIfSelected();
		stopEditingIfEditing();

		currentNodeSetIsSelected.current = nodeSetIsSelected;
		currentNode.current = node;
		currentNodeSetIsEditing.current = nodeSetIsEditing;
		currentNodeIsEditing.current = isEditing;
	}

	const editNode = () =>{
		if (setEditButtonText.current == null){
			return;
		}
		if(currentNodeSetIsEditing.current == null){
			return;
		}
		currentNodeIsEditing.current = !currentNodeIsEditing.current;
		currentNodeSetIsEditing.current(currentNodeIsEditing.current);
		
		if (currentNodeIsEditing.current == true){
			setEditButtonText.current("Apply");
		}else{
			setEditButtonText.current("Edit");
		}
	}

	const assignEditButtonTextState = (editButtonTextState: Dispatch<SetStateAction<string>>) =>{
		setEditButtonText.current = editButtonTextState;
	}

	const clearSelect = () =>{

		unselectNodeIfSelected();
		stopEditingIfEditing();

		currentNodeSetIsSelected.current = null;
		currentNode.current = null;
		currentNodeSetIsEditing.current = null;
		currentNodeIsEditing.current = false;
	}

	const stopEditingIfEditing = () => {
		if(currentNodeSetIsEditing.current != null){
			currentNodeSetIsEditing.current(false);
			setEditButtonText.current!!("Edit");
			currentNodeIsEditing.current = false;
		}
	}

	const unselectNodeIfSelected = () => {
		if(currentNodeSetIsSelected.current != null){
			currentNodeSetIsSelected.current(false);
		}
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