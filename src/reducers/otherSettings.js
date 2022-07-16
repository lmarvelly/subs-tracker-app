const otherSettingsDefaultState = [];

export default ( state = otherSettingsDefaultState, action ) =>
{
	switch (action.type) 
	{
		case 'ADD_SESSION_TYPE':
			return [
				...state,
				{
					...action.sessionName
				}
			]

		case 'EDIT_SESSION_TYPE':
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

		case 'REMOVE_SESSION_TYPE':
			return state.filter( ({ sessionUuid }) => sessionUuid !== action.sessionUuid );

		case 'SET_SESSION_TYPE':
			return action.sessionNames
		
		default:
			return state;
	}
}