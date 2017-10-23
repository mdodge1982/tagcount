import React, {Component} from 'react';
import FormContainer from '../containers/FormContainer';
import BarChartContainer from '../containers/BarChartContainer';
import TreeMapContainer from '../containers/TreeMapContainer';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Welcome to Tag Counter</h1>
				</header>
				<section className="App-body">
					<p className="App-intro">
						To get started, paste HTML content or a URL below and submit.
					</p>
					<FormContainer />
					{this.props.tags &&
					<div>
						<TreeMapContainer />
						<BarChartContainer />
					</div>
					}
				</section>
			</div>
		);
	}
};

export default App;
