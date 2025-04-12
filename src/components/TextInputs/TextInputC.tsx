import React from "react";

interface TextInputProps{
	inputTextP?: string;
	setParentValueFromInputP: (inputValue: string) => void
}

const TextInputC: React.FC<TextInputProps> = 
	({
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
			<input id="TextInput" className="TextInput" value={inputText} autoFocus={true}
				onChange={changeInputText}>
			</input>
		</div>
	);
}

export default TextInputC