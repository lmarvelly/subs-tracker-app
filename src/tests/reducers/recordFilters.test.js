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
		memberTextFilter: '',
		playerUuid: '',
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
	const startDate = moment().startOf('year').add( 2, 'months');
	const action = { type: 'SET_START_DATE', startDate };
	const state = filtersReducer( undefined, action );

	expect( state.startDate ).toEqual(startDate);
});

test('should set endDate to the First of September of current year', () => 
{
	const date = moment().startOf('year').add( 8, 'months');
	const action = { type: 'SET_END_DATE', endDate: date };
	const state = filtersReducer( undefined, action );

	expect( state.endDate ).toEqual(date);
});


test('should set sortBy to dateAscending', () => 
{
	const currentState =
	{
		text: '',
		memberTextFilter: '',
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
		memberTextFilter: '',
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
	const text =  'testing';
	const action = { type:'SET_FILTER_TEXT', text };
	const state = filtersReducer( undefined, action );

	expect( state.text ).toBe( text );
});

test('should set member text filter to "Player Name"', () => 
{
	const text = 'Player Name';
	const action = { type: 'SET_MEMBER_FILTER_TEXT', text };
	const state = filtersReducer( undefined, action );

	expect( state.memberTextFilter ).toBe( text );
});
