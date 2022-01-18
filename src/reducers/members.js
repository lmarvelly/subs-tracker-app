const membersRecordReducerDefaultState = [];


export default ( state = membersRecordReducerDefaultState, action ) =>
{
	switch ( action.type ) {
		case 'ADD_MEMBER':
			return [
				...state,
				action.member
			]
		case 'REMOVE_MEMBER':
			return state.filter( ({ playerUuid }) => playerUuid !== action.playerUuid )
	
		default:
			return state;
	}
}