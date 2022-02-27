// SORT_BY_DATE_ASCENDING
export const sortByDateAscending = () =>
({
	type: 'SORT_BY_DATE_ASCENDING'
});
// SORT_BY_DATE_DESCENDING
export const sortByDateDescending = () =>
({
	type: 'SORT_BY_DATE_DESCENDING'
});

// SET_START_DATE
export const setStartDate = ( startDate ) =>
({
	type: 'SET_START_DATE',
	startDate
});
// SET_END_DATE
export const setEndDate = ( endDate ) =>
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
export const setTextFilter = ( text = '' ) =>
({
	type: 'SET_FILTER_TEXT',
	text
});

// RESET

// FILTER BY MEMBER
export const setMemberFilterText = ( text = '' ) =>
({
	type: 'SET_MEMBER_FILTER_TEXT',
	text
});

// FILTER BY SEASON
export const setSeasonFilter = ( seasonUuid ) =>
({
	type: 'SET_SEASON_FILTER',
	seasonUuid
});