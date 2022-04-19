import { 
	sortAlphabetAsc, 
	sortAlphabetDesc, 
	setMemberTextFilter,
	resetMemberFilters
} 
from '../../actions/memberFilters';

test('should generate a Sort Alphabetically Ascending action generator', () => 
{
	const action = sortAlphabetAsc();

	expect( action ).toEqual({ type: 'SORT_ALPHABETIC_ASC' });
});

test('should generate a Sort Alphabetically Descending action generator', () => 
{
	const action = sortAlphabetDesc();

	expect( action ).toEqual({ type: 'SORT_ALPHABETIC_DESC' });
});

test('should generate a Set Member Text Filter action generator', () => 
{
	const text = 'Some text';
	const action = setMemberTextFilter( text );
	
	expect( action ).toEqual(
	{ 
		type: 'SET_MEMBER_TEXT_FILTER',
		text
	});
});

test('should generate a clear filters action object', () =>
{
	const action = resetMemberFilters();

	expect(action).toEqual({type: 'RESET_MEMBER_FILTERS'});
});