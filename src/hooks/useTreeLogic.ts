import { useContext } from "react";
import TreeLogicContext from "../providers/TreeLogicProvider";

export const useTreeLogic = () => {
	const context = useContext(TreeLogicContext);
	if (context === undefined) {
		throw new Error('useAuseTreeLogicuth must be used within an TreeLogicContext');
	}
	return context;
};