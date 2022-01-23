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
		case 'EDIT_MEMBER':
			return state.map( ( member ) => 
			{
				console.log('PlayerUuid is same: ', member.playerUuid === action.playerUuid);
				if( member.playerUuid === action.playerUuid )
				{
					return {
						...member,
						...action.updates
					}
				}
				else { return member }
			})

		default:
			return state;
	}
}