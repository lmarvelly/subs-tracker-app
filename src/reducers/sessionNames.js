const sessionNamesDefaultState = [];

export default ( state = sessionNamesDefaultState, action ) =>
{
	switch (action.type) 
	{
		case 'ADD_SESSION_NAME':
			return [
				...state,
				{
					...action.sessionName
				}
			]

		case 'EDIT_SESSION_NAME':
			return state.map( ( session ) =>
				{
					if( session.sessionUuid === action.sessionUuid )
					{
						return {
							...session,
							...action.updates
						}
					}
					else { return session };
				})

		case 'REMOVE_SESSION_NAME':
			return state.filter( ({ sessionUuid }) => 
				sessionUuid !== action.sessionUuid );

		case 'SET_SESSION_NAME':
			return action.sessionNames
		
		default:
			return state;
	}
}