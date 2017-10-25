import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import tagCounter from './reducers';
import AppContainer from './containers/AppContainer';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

let store = createStore(
	tagCounter,
	applyMiddleware(thunk)
);

render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
