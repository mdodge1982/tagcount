import React, {Component} from 'react';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import './TypeToggle.css';

class TypeToggle extends Component {
	render() {
		const {name,value,onChange,options} = this.props;
		return (
			<ToggleButtonGroup bsSize="xs" type="radio" name={name} value={value} onChange={onChange}>
				{options.map(option => (
					<ToggleButton key={option.value} value={option.value}>{option.label}</ToggleButton>
				))}
			</ToggleButtonGroup>
		);
	}
};

export default TypeToggle;
