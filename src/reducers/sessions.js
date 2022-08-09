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

		case 'SET_SESSIONS':
			return action.sessions;
	
		default:
			return state;
	}
};