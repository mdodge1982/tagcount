const toggleType = () => {
	return {type: 'TYPE_TOGGLE'};
};

const submitValue = value => {
	return (dispatch,getState) => {
		const {type} = getState();
		dispatch({
			type: type+'_UPDATE',
			value
		});
	};
};

export {toggleType,submitValue};
