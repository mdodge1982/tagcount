import React, {Component} from 'react';
import BarChartContainer from '../containers/BarChartContainer';
import TreeMapContainer from '../containers/TreeMapContainer';
import FontAwesome from 'react-fontawesome';
import './Charts.css';

class Charts extends Component {
	constructor(props){
		super(props);
		this.state = {
			expanded: 'treemap'
		}
	}
	render() {
		return (
			<div className="Charts">
				<div>
				{this.state.expanded==='treemap' &&
					<TreeMapContainer />
				}
				{this.state.expanded==='barchart' &&
					<FontAwesome name='th' onClick={(e) => this.setExpanded('treemap')} />
				}
				</div>
				<div>
				{this.state.expanded==='barchart' &&
					<BarChartContainer />
				}
				{this.state.expanded==='treemap' &&
					<FontAwesome name='bar-chart' onClick={(e) => this.setExpanded('barchart')} />
				}
				</div>
			</div>
		);
	}
	setExpanded(value) {
		this.setState({expanded:value});
	}
};

export default Charts;
