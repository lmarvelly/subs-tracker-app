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

		case 'SET_PAYMENT_TYPES':
			return action.paymentTypes
	
		default:
			return state;
	}
}