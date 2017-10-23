import {connect} from 'react-redux';
import {toggleType,submitValue} from '../actions/';
import InputForm from '../components/InputForm';

const mapStateToProps = (state) => {
	return state;
}

export default connect(
	mapStateToProps,
	{toggleType,submitValue}
)(InputForm);
