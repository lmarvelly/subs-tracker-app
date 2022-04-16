// Have third party's at the top
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';

import configureStore from './store/configureStore';
import getVisibleMembers from './selectors/members';
import getVisibleSeasons from './selectors/seasons';
import getVisibleRecords from './selectors/records';

import { startSetRecords } from './actions/records';
import { sortAlphabetAsc } from './actions/memberFilters';
import { startSetMembers } from './actions/members';
import { startSetSeasons } from './actions/seasons';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css'; // Normalizes all styles starting points on all browsers.
import './styles/styles.scss'; // SASS styles form
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore();

/**
 * This can be called to unsubscribe from store updates
 */
const unsubscribe = store.subscribe(() => 
{
	const state = store.getState();
	const visibleMembers = getVisibleMembers( state.members, state.memberFilters );
	const visibleSeasons = getVisibleSeasons( state.seasons, state.seasonFilters );
 	const visibleRecords = getVisibleRecords( state.paymentRecord, state.members, state.recordFilters );
});

/**
 * Provider provides the store to all of our Components to connect
 * through importing connect from react-redux.
 * It requires one argument, which is the store.
 * 
 * This makes the easy to share the State with all the Components
 * rather than passing it down from one Component to the next
 */
const jsx = (
	<React.StrictMode>
		<Provider store={store}>
		<AppRouter />
	</Provider>
	</React.StrictMode>
);

// To stop App rendering multiple times
let hasRendered = false;
const renderApp = () =>
{
	if(!hasRendered)
	{
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
}

// Render Loading Message
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// Firebase authentication
firebase.auth().onAuthStateChanged((user) =>
{
	if(user)
	{
		store.dispatch(login(user.uid));
		// App renders after Promises are complete
		store.dispatch(startSetSeasons())
			.then(store.dispatch(startSetMembers()))
			.then(store.dispatch(startSetRecords()))
			.then(() =>
			{
				store.dispatch( sortAlphabetAsc() ); // Should sort Member alphabetically
				renderApp();
				if(history.location.pathname === '/')
				{
					history.push('/dashboard');
				};
			});
	}
	else
	{
		store.dispatch(logout())
		renderApp();
		history.push('/');
	}
});