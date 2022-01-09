const paymentRecordReducerDefaultState = [];

/**
 * Record REDUCER
 * 
 * ADD PAYMENT - we use the ES6 spread operator to create a new 
 * array out of the state and add the new payment to it
 * 
 * REMOVE RECORD - Filters out the Record
 * 
 * @returns The Subs state ONLY with any changes 
 */
export default ( state = paymentRecordReducerDefaultState, action ) =>
{
	switch ( action.type )
	{
		case 'ADD_PAYMENT':
			return [
				...state, 
				action.payment 
			]
		case 'ADD_DEBT':
			return [
				...state,
				action.debt
			]
		case 'REMOVE_RECORD':
			return state.filter( ( { id } ) => id !== action.id)

		case 'EDIT_RECORD':
			return state.map( ( record ) => 
			{
				if( record.id === action.id )
				{
					return {
						...record, 
						...action.updates 
					};
				}
				return record;
			})

		default:
			return state;
	}
};