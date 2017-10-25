import {connect} from 'react-redux';
import {submitValue,clearInput} from '../actions/';
import InputForm from '../components/InputForm';

const mapStateToProps = (state) => {
	return state;
}

export default connect(
	mapStateToProps,
	{submitValue,clearInput}
)(InputForm);
