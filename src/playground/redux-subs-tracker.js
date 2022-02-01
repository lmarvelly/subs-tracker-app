import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

/**
 * This is good to flick over to get an overview one how Reducers
 * and Action Generators work together
 */

// Should it be called 'Team money collecter' or 'Team money log' instead
// Maybe have a default for 'sub payment' or 'sub debt'
// Things to add later:

// Have a button next to DEBT to pay off some or all of it

// NEW_SEASON
// NEW_TEAM


/**
 * ADD A SUB PAYMENT
 * 
 * Takes in 4 arguments: playerUuid, description, amount and 
 * createdAt 
 * 
 * 
 * @param {string} playerUuid
 * @param {string} id: uuid()
 * @param {string} recordType 'SUB_PAYMENT'
 * @param {string} description
 * @param {number} amount
 * @param {number} createdAt
 * 
 * 
 * @returns A type and a object
 * 
 * @type 'ADD_PAYMENT'
 * @object playerUuid, id, recordType, description, amount, createdAt
 * 
 */
const addPayment = (
	{
		playerUuid = '',
		description = '', 
		amount = 0, 
		createdAt = 0
	}) => (
{
	type: 'ADD_PAYMENT',
	payment: 
	{
		playerUuid,
		id: uuid(),
		recordType: 'PAYMENT',
		description,
		amount,
		createdAt
	}
});

// ADD_DEBT

/**
 * EDIT RECORD
 * 
 * @param 
 * @returns 
 */
const editRecord = ( id, updates ) =>
({
	type: 'EDIT_RECORD',
	id,
	updates
})

// PAY_DEBT
// ADD_OTHER

/**
 * REMOVE_RECORD
 * 
 * Default is an empty object which will remove nothing
 */
const removeRecord = ( { id } = {} ) =>
({
	type: 'REMOVE_RECORD',
	id
});

// SORT_BY_DATE_ASCENDING
const sortByDateAscending = () =>
({
	type: 'SORT_BY_DATE_ASCENDING'
});
// SORT_BY_DATE_DESCENDING
const sortByDateDescending = () =>
({
	type: 'SORT_BY_DATE_DESCENDING'
});

// SORT_BY_AMOUNT
const sortByAmount = () =>
({
	type: 'SORT_BY_AMOUNT'
});

// SET_START_DATE
const setStartDate = ( startDate ) =>
({
	type: 'SET_START_DATE',
	startDate
});
// SET_END_DATE
const setEndDate = ( endDate ) =>
({
	type: 'SET_END_DATE',
	endDate
});

/**
 * SET TEXT FILTER
 * 
 * @returns The type, so the reducer knows what to do with the 
 * object, and the text to filter the records by
 */
const setTextFilter = ( text = '' ) =>
({
	type: 'SET_FILTER_TEXT',
	text
});

// RESET

const paymentRecordReducerDefaultState = [];

/**
 * Record REDUCER
 * 
 * ADD PAYMENT - we use the ES6 spread operator to create a new 
 * array out of the state and add the new payment to it
 * 
 * REMOVE RECORD - Filters out the Record
 * 
 * @returns The Subs state ONLY with any changes 
 */
const paymentRecordReducer = ( state = paymentRecordReducerDefaultState, action ) =>
{
	switch ( action.type )
	{
		case 'ADD_PAYMENT':
			return [
				...state, 
				action.payment 
			]
		case 'REMOVE_RECORD':
			return state.filter( ( { id } ) => id !== action.id)

		case 'EDIT_RECORD':
			return state.map( ( record ) => 
			{
				if( record.id === action.id )
				{
					return {
						...record, 
						...action.updates 
					};
				}
				return record;
			})

		default:
			return state;
	}
};

const paymentRecordReducerFilterDefaultState = 
{
	text: '',
	sortBy: 'dateAscending',
	startDate: undefined,
	endDate: undefined
};

/**
 * FILTERS REDUCER
 * 
 * @returns The filter's State with changes ONLY nothing else
 */
const filtersReducer = ( state = paymentRecordReducerFilterDefaultState, action ) =>
{
	switch ( action.type )
	{
		case 'SET_FILTER_TEXT':
			return { 
				...state, 
				text: action.text 
			}
		case 'SORT_BY_DATE_ASCENDING':
			return { 
				...state, 
				sortBy: 'dateAscending'
			}
		case 'SORT_BY_DATE_DESCENDING':
			return { 
				...state, 
				sortBy: 'dateDescending'
			}
		case 'SET_START_DATE': 
			return { 
				...state, 
				startDate: action.startDate 
			}
		case 'SET_END_DATE': 
			return { 
				...state, 
				endDate: action.endDate 
			}
		case 'SORT_BY_AMOUNT':
			return { 
				...state, 
				sortBy: 'amount'
			}
		default:
			return state;
	}
}

/**
 * Destruct Filters
 * {
 * 	text
 * 	sortBy
 * 	startDate
 * 	endDate
 * }
 * 
 * @param {*} records 
 * @param {*} filters
 */
const getVisibleRecords = ( records, { text, sortBy, startDate, endDate } ) =>
{
	return records.filter( (record) =>
	{
		const startDateMatch = typeof startDate !== 'number' || record.createdAt >= startDate; // if the record is created before the startDate it gets filtered out
		const endDateMatch  = typeof endDate !== 'number' || record.createdAt <= endDate; // if the record is created after the endDate then it's filtered out
		const textMatch = record.description.toLowerCase().includes(text.toLowerCase());
		
		return startDateMatch && endDateMatch && textMatch; // Return true only if all the above are true. Record is removed if false
	}).sort( (a, b) => {
		if( sortBy === 'dateAscending' ) {
			return a.createdAt < b.createdAt ? 1 : -1; // 1 if true, -1 if false
		}
		else if( sortBy === 'dateDescending' ) {
			return a.createdAt > b.createdAt ? 1 : -1; // 1 if true, -1 if false
		}
		else if( sortBy === 'amount' ) {
			return a.amount > b.createdAt ? 1 : -1;
		}
	});
}

/**
 * STORE CREATION
 * 
 * Calls the reducers with no state and no action, so the default 
 * state is invoked instead.
 * @param {array} paymentRecord is the array of records, it's an empty array by 
 * default.
 * @param {object} filtersReducer this is the object of filters
 */
const store = createStore(
	combineReducers(
	{
		paymentRecord: paymentRecordReducer,
		filters:  filtersReducer
	})
);

/**
 * This can be called to unsubscribe from store updates
 */
store.subscribe(() => 
{
	const state = store.getState();
	const visibleRecords = getVisibleRecords( state.paymentRecord, state.filters );

	console.log(state.filters);
	console.log( visibleRecords );
});

const demoState = 
{
	paymentRecord: 
	[
		{
			"uuid":"e82626bd-d15e-446a-b2fb-d292449248ab",
			"playerUuid":"12345",
			"createdAt":1622380833549,
			"recordType": "newPayment",
			"description": "New payment",
			"amount": 400
		},
		{
			"uuid":"bd9962be-54f2-4b62-85df-b6842f98b084",
			"playerUuid":"23456",
			"createdAt":1622379856853,
			"recordType": "moneyOwing",
			"description": "Money owed for 5s",
			"amount": 500
		},
		{
			"uuid":"bd9962be-54f2-4b62-85df-b632432557fd",
			"playerUuid":"34567",
			"createdAt":1622379856800,
			"recordType": "debtPayment",
			"description": "Late payment for training",
			"amount": 400
		},
		{
			"uuid":"b56728b4-7a3f-46a2-b100-2587efaa2f2d",
			"playerUuid":"12345",
			"createdAt":1622378144280,
			"recordType": "newPayment",
			"description": "Payment for training",
			"amount": 400
		},
		{
			"uuid":"55ca6501-4c5e-40eb-b01c-2db4eb294049",
			"playerUuid":"12345",
			"createdAt":1621352306611,
			"recordType": "debtPayment",
			"description": "Late payment for training",
			"amount": 400
		},
		{
			"uuid":"d8d79f81-09ed-4cad-a4da-b371fe368f14",
			"playerUuid":"34567",
			"createdAt":1622296067850,
			"recordType": "newPayment",
			"description": "Payment for training",
			"amount": 400
		},
		{
			"uuid":"aedcac42-c3fa-4c54-9fc4-3af5d7a78151",
			"playerUuid":"34567",
			"createdAt":1621352367550,
			"recordType": "newPayment",
			"description": "Payment for 5s",
			"amount": 500
		},
		{
			"uuid":"6fbc5bc2-3ffc-4e8d-aeb7-738104851f06",
			"playerUuid":"23456",
			"createdAt":1622295937190,
			"recordType": "moneyOwing",
			"description": "Payment for training",
			"amount": 400
		}
	],
	filters:
	{
		text: 'training',
		startDate: undefined,
		endDate: undefined
	}
}

/**
 * HOW IT WORKS:
 * 0. When the paymentRecordReducer was created in the store, named
 * 	paymentRecord, it was invoked with the default Record State
 * 	(just the Record State, not the whole State)
 * 1. Calls addPayment() which returns an object with the following
 * 	properties
 * 		type: 'ADD_PAYMENT',
 * 		payment: 
 * 		{
 * 			playerUuid,
 *				id: uuid(),
 * 			recordType: 'PAYMENT',
 * 			description,
 * 			amount,
 * 			createdAt
 * 		}
 * 2. The the store calls paymentRecordReducer because 
 * 	'ADD_PAYMENT', the objects type, matches it's first case
 * 	(This is under paymentRecord in the combined reducer)
 * 3. The Reducer returns the old state of the paymentRecord with 
 * 	the new object. This then becomes the new paymentRecord 
 * 	State.
 */
const payment1 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '123', 
			description: 'Training subs', 
			amount: 400, 
			createdAt:-500 
		} 
	)
);

const payment2 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '123', 
			description: '5s subs', 
			amount: 500, 
			createdAt: -1000 
		} 
	)
);

const payment3 = store.dispatch( 
	addPayment( 
		{ 
			playerUuid: '1234', 
			description: 'donation', 
			amount: 5000, 
			createdAt: -2000 
		} 
	)
);

// store.dispatch( editRecord( payment3.payment.id, { description: 'A kind donation' } ));

// store.dispatch( 
// 	editRecord( 
// 		payment2.payment.id, 
// 		{
// 			description: '5s and training subs', 
// 			amount: 900
// 		} 
// 	)
// );

// store.dispatch(removeRecord( { id: payment2.payment.id } ));

// store.dispatch(setTextFilter('UBS'));
// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());
// store.dispatch(sortByDateAscending());
store.dispatch(sortByDateDescending());
// store.dispatch(sortByAmount());

// store.dispatch(setStartDate(500));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1000));