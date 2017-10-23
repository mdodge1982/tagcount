import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import './TypeToggle.css';

const ConditionalButton = (props) => {
	const {active,label,onClick} = props;
	if(active){
		return <strong>{label}</strong>
	}else{
		return <RaisedButton label={label} primary={true} onClick={onClick} />
	}
};

class TypeToggle extends Component {
	render() {
		return (
			<div className="TypeToggle">
				{this.props.types.map(str => (
					<ConditionalButton key={str} label={str}
						active={str===this.props.type} onClick={this.props.toggleType} />
				))}
			</div>
		);
	}
};

export default TypeToggle;
