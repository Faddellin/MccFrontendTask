import React from "react"

import GreenButtonC from "./Buttons/GreenButtonC";

interface AppProps{

}
const App: React.FC<AppProps> = 
	({

	}) => {


	return (
		<div className="MainPage">
			<div className="TreeContainer">
				<div className="TreeHeader">
					<span>Tree</span>
				</div>
				<div className="Tree">

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
