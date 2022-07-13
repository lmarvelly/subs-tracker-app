import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import otherSettingsReducer from '../reducers/otherSettings';
import paymentRecordReducer from '../reducers/records';
import recordFilterReducer from '../reducers/recordFilters';
import membersRecordReducer from '../reducers/members';
import memberFilterReducer from '../reducers/memberFilters';
import seasonsRecordReducer from '../reducers/seasons';
import seasonFilterReducer from '../reducers/seasonFilters';
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
			sessionTypes: otherSettingsReducer,
			paymentRecord: paymentRecordReducer,
			recordFilters:  recordFilterReducer,
			members: membersRecordReducer,
			memberFilters: memberFilterReducer,
			seasons: seasonsRecordReducer,
			seasonFilters: seasonFilterReducer,
			auth: authReducer
		}),
		composeEnhancers(applyMiddleware(thunk))
	);

	return store;
};