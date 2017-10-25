import React, {Component} from 'react';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Button from 'react-bootstrap/lib/Button';
import './InputForm.css';

class InputForm extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearInput = this.clearInput.bind(this);
	}
	render() {
		let textFieldProps = {
			inputRef: ref => this.input = ref,
			placeholder: 'Paste HTML content',
			componentClass: 'textarea',
			rows: this.props.docElem
				? 2
				: 10
		};
		return (
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="formBasicText">
					<FormControl {...textFieldProps} />
					<FormControl.Feedback/>
				</FormGroup>
				<ButtonToolbar>
					<Button type="submit" bsStyle="primary">Submit</Button>
					<Button onClick={this.clearInput}>Clear</Button>
				</ButtonToolbar>
			</form>
		);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.submitValue(this.input.value);
	}
	clearInput(e) {
		this.input.value = '';
		this.props.clearInput();
	}
};

export default InputForm;
