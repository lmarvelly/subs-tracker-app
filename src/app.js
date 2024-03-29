// Have third party's at the top
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';

import configureStore from './store/configureStore';

import { startSetPaymentTypes } from './actions/paymentTypes';
import { startSetSessionName } from './actions/sessionNames';
// import { startSetSessions } from './actions/sessions';
// import { startSetRecords } from './actions/records';
import { sortAlphabetAsc } from './actions/memberFilters';
import { startSetMembers } from './actions/members';
import { startSetSeasons } from './actions/seasons';
import { sortAsc } from './actions/seasonFilters';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css'; // Normalizes all styles starting points on all browsers.
import './styles/styles.scss'; // SASS styles form
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage';

const store = configureStore();


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
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

// Firebase authentication
firebase.auth().onAuthStateChanged((user) =>
{
	if(user)
	{
		store.dispatch(login(user.uid));
		// App renders after Promises are complete
		// store.dispatch(startSetSessions());
		store.dispatch(startSetSessionName());
		store.dispatch(startSetPaymentTypes());
		store.dispatch(startSetMembers());
		store.dispatch(startSetSeasons())
		// store.dispatch(startSetRecords(store.getState().seasons[0])) // Doesn't work
			.then(() =>
			{
				store.dispatch( sortAlphabetAsc() ); // Sort Members alphabetically
				store.dispatch( sortAsc() ); // Sort Seasons alphabetically
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