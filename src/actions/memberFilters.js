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


// sort by biggest/smallest debt