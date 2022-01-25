const membersReducerFilterDefaultState = 
{
	text: '',
	sortBy: 'alphabetAsc'
};

/**
 * MEMBER FILTER REDUCER
 */
export default ( state = membersReducerFilterDefaultState, action ) =>
{
	switch ( action.type ) {
		case 'SORT_ALPHABETIC_ASC':
			return {
				...state,
				sortBy: 'alphabetAsc'
			}
	
		default:
			return state
	}
}