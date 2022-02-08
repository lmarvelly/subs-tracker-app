const seasonReducerDefaultState = [];

export default ( state = seasonReducerDefaultState, action ) =>
{
	switch ( action.type ) 
	{
		case 'ADD_SEASON':
			return [
				...state,
				{
					...action.season
				}
			]
	
		default:
			return state;
	}
}