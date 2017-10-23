import React, {Component} from 'react';
import TypeToggle from './TypeToggle';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class InputForm extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			value: ''
		}
	}
	render() {
		let textFieldProps = {
			floatingLabelText: 'Paste a page URL',
			floatingLabelStyle: {
				left: '0'
			},
			fullWidth: true
		};
		if(this.props.type==='HTML'){
			textFieldProps = {
				...textFieldProps,
				floatingLabelText: 'Paste HTML content',
				multiLine: true,
				rows: 5
			};
		}
		return (
			<form onSubmit={this.handleSubmit}>
				<TypeToggle type={this.props.type} types={['HTML','URL']} toggleType={this.props.toggleType} />
				<TextField {...textFieldProps} ref={(input) => this.input = input}
					value={this.state.value} onChange={this.handleChange} />
				<RaisedButton label="Submit" type="submit" primary={true} />
			</form>
		);
	}
	handleChange(e,text) {
		this.setState({value:text});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.submitValue(this.input.getValue());
		this.setState({value:''});
	}
};

export default InputForm;
