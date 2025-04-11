import React from "react";

interface TextInputProps{
	placeHolderP: string;
	labelTextP: string;
	inputTextP?: string;
	setParentValueFromInputP: (inputValue: string) => void
}

const TextInputC: React.FC<TextInputProps> = 
	({
		placeHolderP,
		labelTextP,
		inputTextP,
		setParentValueFromInputP
	}) => {
	const [inputText, setInputText] = React.useState<string>(inputTextP === undefined ? "" : inputTextP);

	const changeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputText(event.target.value);
		setParentValueFromInputP(event.target.value);
	};

	return(
		<div className="TextInputContainer">
			<div className="TextInputField">
				<div className="TextInputStateLayer">
					<label id="Label" className="TextInputLabel">{labelTextP}</label>
					<input className="TextInput" placeholder={placeHolderP} value={inputText}
						onChange={changeInputText}>
					</input>
				</div>
			</div>
		</div>
	);
}

export default TextInputC