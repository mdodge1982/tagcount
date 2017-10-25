import React, {Component} from 'react';
import FormContainer from '../containers/FormContainer';
import Logo from './Logo';
import Charts from './Charts';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<Logo />
					<h1 className="App-title">HTML Treemapper</h1>
				</header>
				<section className="App-body">
					<FormContainer />
					{this.props.tags &&
					<Charts />
					}
				</section>
			</div>
		);
	}
};

export default App;
