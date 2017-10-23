const parseTags = (node,tags) => {
	if(node.childNodes){
		for(let i=0;i<node.childNodes.length;i++){
			const childNode = node.childNodes[i];
			if(childNode.nodeType===1){
				const name = childNode.nodeName.toLowerCase();
				if(tags[name]){
					tags[name].count++;
				}else{
					tags[name] = {name:name,count:1};
				}
				parseTags(childNode,tags);
			}
		};
	}
	return tags;
}

const initialState = {
	type: 'HTML'
};

const tagCounter = (state = initialState, action) => {
	switch(action.type){
		case 'TYPE_TOGGLE':
			const type = state.type==='HTML' ? 'URL' : 'HTML';
			return {
				...state,
				type
			};
		case 'HTML_UPDATE':
			const parser = new DOMParser();
			const doc = parser.parseFromString(action.value,'text/html');
			const docElem = doc.documentElement;
			return {
				...state,
				tags: parseTags(docElem,{}),
				docElem
			}
		case 'URL_UPDATE':
			return {
				...state,
				url: action.value
			}
		default:
			return state;
	}
};

export default tagCounter;
