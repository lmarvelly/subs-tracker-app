export const sortAsc = () => 
({
	type: 'SORT_ASC'
});

export const sortDesc = () => 
({
	type: 'SORT_DESC'
});

export const setSeasonTextFilter = ( text = '' ) =>
({
	type: 'SET_SEASON_TEXT_FILTER',
	text
});