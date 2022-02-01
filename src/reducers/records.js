const paymentRecordReducerDefaultState = [];

/**
 * Record REDUCER
 * 
 * ADD PAYMENT - we use the ES6 spread operator to create a new 
 * array out of the state and add the new payment to it
 * 
 * REMOVE RECORD - Filters out the Record
 * 
 * @argument state This is the array of the Records Current State
 * @argument action This is the action generator object
 * 
 * @returns The Subs state ONLY with any changes 
 */
export default ( state = paymentRecordReducerDefaultState, action ) =>
{
	switch ( action.type )
	{
		case 'ADD_RECORD':
			return [ 
				...state, 
				{
					...action.record, 
					amountPaid: action.record.recordType === 'DEBT' ? 0 : ""
				} 
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
				else { return record };
			})

		default:
			return state;
	}
};