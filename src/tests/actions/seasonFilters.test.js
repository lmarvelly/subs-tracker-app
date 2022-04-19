import { 
	sortAsc, 
	sortDesc, 
	setSeasonTextFilter,
	resetSeasonFilters
}
from "../../actions/seasonFilters";

test('should generate a Sort Ascending action generator', () => {
	const action = sortAsc();

	expect(action).toEqual({ type: 'SORT_ASC' });
});

test('should generate a Sort Ascending action generator', () => {
	const action = sortDesc();

	expect(action).toEqual({ type: 'SORT_DESC' });
});

test('should generate a Text Filter action generator', () => 
{
	const text = 'Some Text';
	const action = setSeasonTextFilter( text );

	expect(action).toEqual({ type: 'SET_SEASON_TEXT_FILTER', text });
});

test('should generate a clear filters action object', () =>
{
	const action = resetSeasonFilters();

	expect(action).toEqual({type: 'RESET_SEASON_FILTERS'});
});