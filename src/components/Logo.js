import React, {Component} from 'react';
import './Logo.css';

class Logo extends Component {
	render() {
		return (
			<svg width="60" height="30" className="Logo">
				<rect width="59" height="29" x="1" y="1" />
				<rect width="28" height="27" x="2" y="2" />
				<rect width="28" height="13" x="31" y="2" />
				<rect width="14" height="13" x="31" y="16" />
				<rect width="13" height="13" x="46" y="16" />
			</svg>
		);
	}
};

export default Logo;
