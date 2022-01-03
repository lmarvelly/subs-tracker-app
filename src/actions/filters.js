// SORT_BY_DATE_ASCENDING
export const sortByDateAscending = () =>
({
	type: 'SORT_BY_DATE_ASCENDING'
});
// SORT_BY_DATE_DECENDING
export const sortByDateDecending = () =>
({
	type: 'SORT_BY_DATE_DECENDING'
});

// SORT_BY_AMOUNT
export const sortByAmount = () =>
({
	type: 'SORT_BY_AMOUNT'
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
	type: 'FILTER_TEXT',
	text
});

// RESET
