import filtersReducer from "../../reducers/seasonFilters";

test('filters should equal default properties', () => 
{
	const state = filtersReducer( undefined, { type: '@@INIT' } );

	expect( state.sortBy ).toBe( 'descending' );
});

test('filters should sort in Ascending order', () => 
{
	const state = filtersReducer( undefined, { type: 'SORT_ASC' } );

	expect( state.sortBy ).toBe( 'ascending' );
});

test('filters should sort in Descending order', () => 
{
	const state = filtersReducer( undefined, { type: 'SORT_DESC' } );

	expect( state.sortBy ).toBe( 'descending' );
});

test('should setup Season Filter Reducer to filter Seasons by text', () => 
{
	const text = 'Some Text';
	const action = { type: 'SET_SEASON_TEXT_FILTER', text };
	const state = filtersReducer( undefined, action );

	expect( state.text ).toBe( text );
});

test('should reset filters', () => 
{
	const text = 'Some Text';
	const action = { type: 'SET_SEASON_TEXT_FILTER', text };
	let state = filtersReducer( undefined, action );
	state = filtersReducer( state, { type: 'SORT_ASC' } );

	// Reset filters
	state = filtersReducer( state, { type: 'RESET_SEASON_FILTERS' } );

	expect(state).toEqual({ text: '', sortBy: 'descending' });
});