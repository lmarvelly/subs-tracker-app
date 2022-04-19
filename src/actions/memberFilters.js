export const sortAlphabetAsc = () => 
({
	type: 'SORT_ALPHABETIC_ASC'
});

export const sortAlphabetDesc = () => 
({
	type: 'SORT_ALPHABETIC_DESC'
});

export const setMemberTextFilter = ( text = '' ) =>
({
	type: 'SET_MEMBER_TEXT_FILTER',
	text
});

export const resetMemberFilters = () =>(
	{
		type: 'RESET_MEMBER_FILTERS'
	})


// sort by biggest/smallest debt?