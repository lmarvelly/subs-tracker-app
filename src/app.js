// Have third party's at the top
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleRecords from './selectors/records';

import { addPayment, editRecord, removeRecord } from './actions/records';
import { sortByDateAscending, sortByDateDescending, sortByAmount, setStartDate, setEndDate, setTextFilter } from './actions/filters';
import {} from './actions/filters';
import 'normalize.css/normalize.css'; // Normalizes all styles starting points on all browsers.
import './styles/styles.scss'; // SASS styles form
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

/**
 * This can be called to unsubscribe from store updates
 */
const unsubscribe = store.subscribe(() => 
{
	const state = store.getState();
 	const visibleRecords = getVisibleRecords( state.paymentRecord, state.filters );

	// console.log( 'FILTERS: ', state.filters );
 	console.log( 'FILTERED RECORDS: ', visibleRecords );
});

const payment1 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '123', 
			description: 'Training subs', 
			amount: 400
		} 
	)
);

const payment2 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '123', 
			description: '5s subs', 
			amount: 500, 
			// createdAt: -1000 
		} 
	)
);

const payment3 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '1234', 
			description: 'donation', 
			amount: 5000, 
			// createdAt: -2000 
		} 
	)
);

/**
 * Provider provides the store to all of our Components to connect
 * through importing connect from react-redux.
 * It requires one argument, which is the store.
 * 
 * This makes the easy to share the State with all the Components
 * rather than passing it down from one Component to the next
 */
const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));

