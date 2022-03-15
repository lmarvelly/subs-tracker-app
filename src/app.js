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
import './firebase/firebase';

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


// store.dispatch( addMember({firstName: 'Luke', middleNames: 'Owen Lloyd', surname: 'Marvelly', nickname: 'Lukio'}) );
// store.dispatch( addMember({firstName: 'Harri', middleNames: '', surname: 'Messenger' }) );
// store.dispatch( addMember({firstName: 'Jason', middleNames: '', surname: 'Cousins'}) );
store.dispatch( sortAlphabetAsc() );
// store.dispatch( sortAlphabetDesc() );
// store.dispatch( setMemberTextFilter('Jason') );
// store.dispatch( setMemberFilterText( store.getState().members[0].playerUuid ) )

// const season1 = store.dispatch(
// 	addSeason({ seasonName: '2020/2021' })
// );

// const season2 = store.dispatch(
// 	addSeason({ seasonName: '2019/2020' })
// );

// const season3 = store.dispatch(
// 	addSeason({ seasonName: 'Donations' })
// );

// store.dispatch( setSeasonFilter( store.getState().seasons[1].seasonUuid ) );

// const record = store.dispatch( 
// 	addRecord( 
// 		{ 
// 			recordType: 'DEBT',
// 			playerUuid: store.getState().members[1].playerUuid, 
// 			seasonUuid: store.getState().seasons[0].seasonUuid,
// 			description: 'Training subs two weeks', 
// 			amountOwed: 700
// 		} 
// 	)
// );

// const record1 = store.dispatch( 
// 	addRecord( 
// 		{ 
// 			recordType: 'PAYMENT',
// 			playerUuid: store.getState().members[1].playerUuid,
// 			seasonUuid: store.getState().seasons[0].seasonUuid,
// 			description: 'Training subs', 
// 			amount: 400
// 		} 
// 	)
// );

// const record2 = store.dispatch( 
// 	addRecord( 
// 		{ 
// 			recordType: 'PAYMENT',
// 			playerUuid: store.getState().members[0].playerUuid,
// 			seasonUuid: store.getState().seasons[1].seasonUuid,
// 			description: '5s subs', 
// 			amount: 500
// 		} 
// 	)
// );

// const record3 = store.dispatch( 
// 	addRecord( 
// 		{ 
// 			recordType: 'PAYMENT',
// 			playerUuid: store.getState().members[2].playerUuid, 
// 			seasonUuid: store.getState().seasons[1].seasonUuid,
// 			description: 'donation', 
// 			amount: 5000
// 		} 
// 	)
// );



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

// store.dispatch(startSetMember());

// Renders after Promise, startSetRecords, has finished
store.dispatch(startSetSeasons())
	.then(store.dispatch(startSetMembers()))
	.then(store.dispatch(startSetRecords()))
	.then(() =>
		{
			ReactDOM.render(jsx, document.getElementById('app'));
		})

// Renders after Promise, startSetRecords, has finished

	.then(() =>
	{
		ReactDOM.render(jsx, document.getElementById('app'));
	});

// Run this once Members and Seasons can be retreived from database
// Renders after Promise, startSetRecords, has finished
// store.dispatch(startSetRecords())
// 	.then(() =>
// 	{
// 		ReactDOM.render(jsx, document.getElementById('app'));
// 	});