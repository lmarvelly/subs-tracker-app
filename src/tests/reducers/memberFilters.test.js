import filtersReducer from '../../reducers/memberFilters';

// Default filter properties
test('filters should equal default properies', () => 
{
	const state = filtersReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual({ text: '', sortBy: 'alphabetAsc' })
});


test('should sort Members Ascending Alphabetically', () => 
{
	const state = filtersReducer( undefined, { type: 'SORT_ALPHABETIC_ASC' } );

	expect( state.sortBy ).toBe('alphabetAsc');
});

test('should sort Members Descending Alphabetically', () => 
{
	const state = filtersReducer( undefined, { type: 'SORT_ALPHABETIC_DESC' } );

	expect( state.sortBy ).toBe('alphabetDesc');
});

test('should setup Member Filter Reducer to filter members by text', () => 
{
	const text = 'testing';
	const action = { type: 'SET_MEMBER_TEXT_FILTER', text };
	const state = filtersReducer( undefined, action );

	expect( state.text ).toBe( text );
});
