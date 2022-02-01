import moment from 'moment';
import filtersReducer from '../../reducers/recordFilters';

/**
 * '@@INIT' is the type of action when App is initialised
 */
test('should setup default filter values', () => 
{
	const state = filtersReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual(
	{
		text: '',
		sortBy: 'dateAscending',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

test('should set sortBy to amount', () => 
{
	const state = filtersReducer( undefined, { type: 'SORT_BY_AMOUNT' });

	expect( state.sortBy ).toBe('amount');
});

test('should set startDate to the First of March of current year', () => 
{
	const currentState =
	{
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount' 
	}	
	const date = moment().startOf('year').add( 3, 'months');
	const action = { type: 'SET_START_DATE', startDate: date };

	const state = filtersReducer( currentState, action );
	// console.log(state);
	expect( state.startDate ).toEqual(date);
});


test('should set sortBy to dateAscending', () => 
{
	const currentState =
	{
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount' // set to be amount so we can see the change
	}
	const action = { type: 'SORT_BY_DATE_ASCENDING' };
	const state = filtersReducer( currentState, action );

	expect( state.sortBy ).toBe( 'dateAscending' );
});

test('should set sortBy to dateDescending', () => 
{
	const currentState =
	{
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'dateAscending' // set to be amount so we can see the change
	}
	const action = { type: 'SORT_BY_DATE_DESCENDING' };
	const state = filtersReducer( currentState, action );

	expect( state.sortBy ).toBe( 'dateDescending' );
});

test('should set filterText to be "testing"', () => 
{
	const currentState = 
	{
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'dateDescending' // set to be amount so we can see the change
	};
	const action = { type:'FILTER_TEXT', text: 'testing' };
	const state = filtersReducer( currentState, action );

	expect( state.text ).toBe('testing');
});

