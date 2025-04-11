import React from "react"

interface GreenButtonProps{
	buttonTextP: string;
	onClickP: () => void;
}

const GreenButtonC: React.FC<GreenButtonProps> = 
	({
		buttonTextP,
		onClickP
	}) => {

	return (
		<button className="GreenButtonContainer" onClick={onClickP}>
			<span className="GreenButtonText">
				{buttonTextP}
			</span>
		</button>
	)
}

export default GreenButtonC