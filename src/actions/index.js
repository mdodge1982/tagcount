const clearInput = () => {
	return {type: 'INPUT_CLEAR'};
};

const submitValue = value => {
	return {type: 'HTML_UPDATE',value};
};

export {clearInput,submitValue};
