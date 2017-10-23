import {connect} from 'react-redux';
import TreeMap from '../components/TreeMap';

const mapStateToProps = (state) => {
	return state;
}

export default connect(
	mapStateToProps,
	{}
)(TreeMap);
