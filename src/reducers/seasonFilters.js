const seasonReducerDefaultState = 
{
	text: '',
	sortBy: 'ascending'
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
	
		default:
			return state;
	}
}