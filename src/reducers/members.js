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
				if( member.playerUuid === action.playerUuid )
				{
					return {
						...member,
						...action.updates
					}
				}
				else { return member }
			})
			
		case 'SET_MEMBERS':
			return action.members
			
		default:
			return state;
	}
}