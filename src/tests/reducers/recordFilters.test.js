import moment from 'moment';
import filtersReducer from '../../reducers/recordFilters';

const defaultState =
{
	descriptionTextFilter: '',
	memberTextFilter: '',
	playerUuid: '',
	seasonFilter: "",
	sortBy: 'dateAscending',
	startDate: moment().subtract(1, 'month'),
	endDate: moment()
}

/**
 * '@@INIT' is the type of action when App is initialised
 */
test('should setup default filter values', () => 
{
	const state = filtersReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual(defaultState);
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
		sortBy: 'dateAscending' // set to be amount so we can see the change
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

test('should set Description Filter Text to be "testing"', () => 
{
	const text =  'testing';
	const action = { type:'SET_DESCRIPTION_FILTER_TEXT', text };
	const state = filtersReducer( undefined, action );

	expect( state.descriptionTextFilter ).toBe( text );
});

test('should set member text filter to "Player Name"', () => 
{
	const text = 'Player Name';
	const action = { type: 'SET_MEMBER_FILTER_TEXT', text };
	const state = filtersReducer( undefined, action );

	expect( state.memberTextFilter ).toBe( text );
});

test('should set Season Filter to be a seasonUuid', () => 
{
	const seasonUuid = 'abcd1234';
	const action = { type: 'SET_SEASON_FILTER', seasonUuid };
	const state = filtersReducer( undefined, action );

	expect( state.seasonFilter ).toBe( seasonUuid );
});

test('should reset filters', () =>
{
	const seasonUuid = 'abcd1234';
	const action1 = { type: 'SET_SEASON_FILTER', seasonUuid };
	let state = filtersReducer( undefined, action1 );

	const text = 'Player Name';
	const action2 = { type: 'SET_MEMBER_FILTER_TEXT', text };
	state = filtersReducer( state, action2 );

	// expect(state).toEqual(
	// {
	// 	descriptionTextFilter: '',
	// 	seasonFilter: 'abcd1234',
	// 	memberTextFilter: 'Player Name',
	// 	playerUuid: '',
	// 	startDate: expect.any(String),
	// 	endDate: expect.any(String),
	// 	sortBy: 'dateAscending' // set to be amount so we can see the change
	// });

	const action3 = { type: 'RESET_RECORD_FILTERS' };
	state = filtersReducer( state, action3 );

	expect(state).toEqual(defaultState);
});