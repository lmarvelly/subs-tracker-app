import { createStore, combineReducers } from 'redux';
import paymentRecordReducer from '../reducers/records';
import filtersReducer from '../reducers/recordFilters';
import membersRecordReducerDefaultState from '../reducers/members';

/**
 * STORE CREATION
 * 
 * Calls the reducers with no state and no action, so the default 
 * state is invoked instead.
 * @param {array} paymentRecord is the array of records, it's an empty array by 
 * default.
 * @param {object} filtersReducer this is the object of filters
 */

export default () => {
	const store = createStore(
		combineReducers(
		{
			paymentRecord: paymentRecordReducer,
			members: membersRecordReducerDefaultState,
			recordFilters:  filtersReducer
		}),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		
	);

	return store;
};

