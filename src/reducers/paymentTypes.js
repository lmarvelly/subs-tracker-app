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
	
		default:
			return state;
	}
}