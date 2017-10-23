import {connect} from 'react-redux';
import BarChart from '../components/BarChart';

const mapStateToProps = (state) => {
	return state;
}

export default connect(
	mapStateToProps,
	{}
)(BarChart);
