// Have third party's at the top
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import getVisibleRecords from './selectors/records';
import getVisibleMembers from './selectors/members';
import getVisibleSeasons from './selectors/seasons';

import { addRecord, editRecord, removeRecord } from './actions/records';
import { 
	sortByDateAscending, sortByDateDescending, sortByAmount, 
	setStartDate, setEndDate, setTextFilter, setMemberFilterText,
	setSeasonFilter 
} from './actions/recordFilters';
import { setMemberTextFilter, sortAlphabetAsc, sortAlphabetDesc } from './actions/memberFilters';
import { addMember, removeMember } from './actions/members';
import { addSeason } from './actions/seasons';
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
 	const visibleRecords = getVisibleRecords( state.paymentRecord, state.members, state.recordFilters );
	const visibleMembers = getVisibleMembers( state.members, state.memberFilters );
	const visibleSeasons = getVisibleSeasons( state.seasons, state.seasonFilters );

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

ReactDOM.render(jsx, document.getElementById('app'));

