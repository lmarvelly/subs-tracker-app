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
		
		case 'EDIT_SEASON':
			return state.map( ( season ) =>
				{
					if( season.seasonUuid === action.seasonUuid )
					{
						return {
							...season,
							...action.updates
						}
					}
					else { return season };
				})

		case 'REMOVE_SEASON':
			return state.filter( ({ seasonUuid }) => seasonUuid !== action.seasonUuid );
	
		default:
			return state;
	}
}