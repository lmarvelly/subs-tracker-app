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
			]
	
		default:
			return state;
	}
};