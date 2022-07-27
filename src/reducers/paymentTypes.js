const paymentTypeDefaultState = [];

export default ( state = paymentTypeDefaultState, action ) =>
{
	switch ( action.type )
	{
		case 'ADD_PAYMENT_TYPE':
			return [
				...state,
				{
					...action.paymentType
				}
			]

		case 'EDIT_SESSION_NAME':
			return state.map( ( paymentType ) =>
			{
				if ( paymentType.paymentTypeUuid === action.paymentTypeUuid ) 
				{
					return {
						...paymentType,
						...action.updates
					}
				}
			})

		case 'REMOVE_PAYMENT_TYPE':
			return state.filter( ({ paymentTypeUuid }) =>
				paymentTypeUuid !== action.paymentTypeUuid );

		case 'SET_PAYMENT_TYPES':
			return action.paymentTypes;
	
		default:
			return state;
	}
}