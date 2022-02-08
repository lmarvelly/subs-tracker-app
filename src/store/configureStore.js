import { createStore, combineReducers } from 'redux';
import paymentRecordReducer from '../reducers/records';
import recordFilterReducer from '../reducers/recordFilters';
import membersRecordReducer from '../reducers/members';
import memberFilterReducer from '../reducers/memberFilters';
import seasonsRecordReducer from '../reducers/seasons';

/**
 * STORE CREATION
 * 
 * Calls the reducers with no state and no action, so the default 
 * state is invoked instead.
 * @param {array} paymentRecord is the array of records, it's an empty array by 
 * default.
 * @param {object} recordFilterReducer this is the object of filters
 */

export default () => {
	const store = createStore(
		combineReducers(
		{
			paymentRecord: paymentRecordReducer,
			recordFilters:  recordFilterReducer,
			members: membersRecordReducer,
			memberFilters: memberFilterReducer,
			seasons: seasonsRecordReducer
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	return store;
};

