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

		case 'REMOVE_SESSION_TYPE':
			return state.filter( ({ sessionUuid }) => sessionUuid !== action.sessionUuid );

		case 'SET_SESSION_TYPE':
			return action.sessionTypes
		
		default:
			return state;
	}
}