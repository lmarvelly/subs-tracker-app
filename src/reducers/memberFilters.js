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
	
		case 'SORT_ALPHABETIC_DESC':
			return {
				...state,
				sortBy: 'alphabetDesc'
			}

		case 'SET_MEMBER_TEXT_FILTER':
			return {
				...state,
				text: action.text
			}

		case 'RESET_MEMBER_FILTERS':
			return membersReducerFilterDefaultState
	
		default:
			return state
	}
}