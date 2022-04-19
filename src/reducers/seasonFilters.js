const seasonReducerDefaultState = 
{
	text: '',
	sortBy: 'descending'
}

export default ( state = seasonReducerDefaultState, action ) =>
{
	switch (action.type) 
	{
		case 'SORT_ASC':
			return {
				...state,
				sortBy: 'ascending'
			};
	
		case 'SORT_DESC':
			return {
				...state,
				sortBy: 'descending'
			};

		case 'SET_SEASON_TEXT_FILTER':
			return {
				...state,
				text: action.text
			}
		
		case 'RESET_SEASON_FILTERS':
			return seasonReducerDefaultState
	
	
		default:
			return state;
	}
}