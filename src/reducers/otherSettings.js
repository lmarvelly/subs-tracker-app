const otherSettingsDefaultState = [];

export default ( state = otherSettingsDefaultState, action ) =>
{
	switch (action.type) 
	{
		case 'ADD_SESSION_TYPE':
			return [
				...state,
				action.sessionType
			]
		default:
			return state;
	}
}