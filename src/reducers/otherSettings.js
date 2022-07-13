const otherSettingsDefaultState = [];

export default ( state = otherSettingsDefaultState, action ) =>
{
	switch (action.type) 
	{
		case 'ADD_SESSION_TYPE':
			return [
				...state,
				{
					...action.sessionType
				}
			]

		case 'SET_SESSION_TYPE':
			return action.sessionTypes
		
		default:
			return state;
	}
}