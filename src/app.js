// Have third party's at the top
import React from 'react';
import ReactDOM from 'react-dom';

import AppRouter, { history } from './routers/AppRouter';
import 'normalize.css/normalize.css'; // Normalizes all styles starting points on all browsers.
import './styles/styles.scss'; // SASS styles form
import 'react-dates/lib/css/_datepicker.css';

/**
 * Provider provides the store to all of our Components
 * 
 * Provider requires one argument which is the store
 */
const jsx = (
	<AppRouter />
);

// let hasRendered = false;
// const renderApp = () =>
// {
// 	if (!hasRendered)
// 	{
// 		ReactDOM.render(jsx, document.getElementById('app'));
// 		hasRendered = true;
// 	}
// };

ReactDOM.render(jsx, document.getElementById('app'));

