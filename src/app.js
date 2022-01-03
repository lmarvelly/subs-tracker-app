// Have third party's at the top
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleRecords from './selectors/records';

import { addPayment, editRecord, removeRecord } from './actions/records';
import { sortByDateAscending, sortByDateDecending, sortByAmount, setStartDate, setEndDate, setTextFilter } from './actions/filters';
import {} from './actions/filters';
import 'normalize.css/normalize.css'; // Normalizes all styles starting points on all browsers.
import './styles/styles.scss'; // SASS styles form
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

/**
 * This can be called to unsubscribe from store updates
 */
store.subscribe(() => 
{
	const state = store.getState();
 	const visibleRecords = getVisibleRecords( state.paymentRecord, state.filters );

	console.log( 'FILTERS: ', state.filters );
 	console.log( 'FILTERED RECORDS: ', visibleRecords );
});

const payment1 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '123', 
			description: 'Training subs', 
			amount: 400, 
			createdAt:-500 
		} 
	)
);

const payment2 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '123', 
			description: '5s subs', 
			amount: 500, 
			createdAt: -1000 
		} 
	)
);

const payment3 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '1234', 
			description: 'donation', 
			amount: 5000, 
			createdAt: -2000 
		} 
	)
);

store.dispatch( setTextFilter('UBS') );

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

