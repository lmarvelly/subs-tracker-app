// Have third party's at the top
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import thunk from 'redux-thunk';

import configureStore from './store/configureStore';
import getVisibleMembers from './selectors/members';
import getVisibleSeasons from './selectors/seasons';
import getVisibleRecords from './selectors/records';

import { addRecord, editRecord, removeRecord, startSetRecords } from './actions/records';
import { sortByDateAscending, sortByDateDescending, setStartDate, 
	setEndDate, setDescriptionTextFilter, setMemberFilterText, setSeasonFilter 
} from './actions/recordFilters';
import { setMemberTextFilter, sortAlphabetAsc, sortAlphabetDesc } from './actions/memberFilters';
import { addMember, removeMember, startSetMember, startSetMembers } from './actions/members';
import { addSeason, startSetSeasons } from './actions/seasons';
import { seasons, members, records } from './tests/fixtures/fixures';
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

	// console.log( 'RECORD FILTERS: ', state.recordFilters );
	// console.log( 'MEMBERS FILTERS: ', state.memberFilters );
	// console.log( 'SEASON FILTERS: ', state.seasonFilters );

 	// console.log( 'FILTERED RECORDS: ', visibleRecords );
 	// console.log( 'FILTERED MEMBERS: ', visibleMembers );
 	// console.log( 'FILTERED SEASONS: ', visibleSeasons );
});

store.dispatch( sortAlphabetAsc() );


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

// Render Loading Message
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

// Renders after Promise, startSetRecords, has finished
store.dispatch(startSetSeasons())
	.then(store.dispatch(startSetMembers()))
	.then(store.dispatch(startSetRecords()))
	.then(() =>
		{
			ReactDOM.render(jsx, document.getElementById('app'));
		})

// Firebase authentication
firebase.auth().onAuthStateChanged((user) =>
{
	if(user)
	{
		history.push('/dashboard');
	}
	else
	{
		history.push('/');
	}
});