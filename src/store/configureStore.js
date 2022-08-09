import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import membersRecordReducer from '../reducers/members';
import memberFilterReducer from '../reducers/memberFilters';
import paymentRecordReducer from '../reducers/records';
import paymentTypesReducer from '../reducers/paymentTypes';
import recordFilterReducer from '../reducers/recordFilters';
import seasonsRecordReducer from '../reducers/seasons';
import seasonFilterReducer from '../reducers/seasonFilters';
import sessionNamesReducer from '../reducers/sessionNames';
import sessionRecordReducer from '../reducers/sessions';

import authReducer from '../reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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
			auth: authReducer,
			members: membersRecordReducer,
			memberFilters: memberFilterReducer,
			paymentRecord: paymentRecordReducer,
			paymentTypes: paymentTypesReducer,
			recordFilters:  recordFilterReducer,
			seasons: seasonsRecordReducer,
			seasonFilters: seasonFilterReducer,
			sessionNames: sessionNamesReducer,
			sessions: sessionRecordReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};