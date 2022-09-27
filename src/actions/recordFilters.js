
export const sortByDateAscending = () =>
({
	type: 'SORT_BY_DATE_ASCENDING'
});

export const sortByDateDescending = () =>
({
	type: 'SORT_BY_DATE_DESCENDING'
});

export const setStartDate = ( startDate ) =>
({
	type: 'SET_START_DATE',
	startDate
});

export const setEndDate = ( endDate ) =>
({
	type: 'SET_END_DATE',
	endDate
});

export const removeDateFilters = () =>
({
	type: 'REMOVE_DATE_FILTERS'
});

/**
 * SET TEXT FILTER
 * 
 * @returns The type, so the reducer knows what to do with the 
 * object, and the text to filter the records by
 */
export const setSessionNameTextFilter = ( text = '' ) =>
({
	type: 'SET_DESCRIPTION_FILTER_TEXT',
	text
});

export const resetRecordFilters = () =>
({
	type: 'RESET_RECORD_FILTERS'
});

export const setMemberFilterText = ( text = '' ) =>
({
	type: 'SET_MEMBER_FILTER_TEXT',
	text
});

export const setMemberUuidFilter = ( playerUuid = '' ) =>
({
	type: 'SET_MEMBER_UUID_FILTER',
	playerUuid
});

export const setSeasonFilter = ( seasonUuid ) =>
({
	type: 'SET_SEASON_FILTER',
	seasonUuid
});

export const resetSeasonFilter = () =>
({
	type: 'RESET_SEASON_FILTER'
});

export const setRecordTypeFilter = ( recordType ) =>
({
	type: 'SET_RECORD_TYPE',
	recordType
});