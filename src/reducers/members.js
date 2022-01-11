const membersRecordReducerDefaultState = [];


export default ( state = membersRecordReducerDefaultState, action ) =>
{
	switch ( action.type ) {
		case 'ADD_MEMBER':
			return [
				...state,
				action.member
			]
			// state.find( (member) =>  )
	
		default:
			return state;
	}
}