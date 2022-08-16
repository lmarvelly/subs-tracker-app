const sessionReducerDefaultState = [];

export default ( state = sessionReducerDefaultState, action ) =>
{
	switch ( action.type ) 
	{
		case 'ADD_SESSION':
			return [
				...state,
				{
					...action.session
				}
			];

		case 'EDIT_SESSION':
			return state.map( (session) =>
			{
				if( session.id === action.id )
				{
					return {
						...session,
						...action.updates
					};
				}
				else { return session }
			});

		case 'SET_SESSIONS':
			return action.sessions;
	
		default:
			return state;
	}
};