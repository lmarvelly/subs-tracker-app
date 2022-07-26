import database from '../firebase/firebase';

export const addPaymentType = ( paymentType ) => (
{
	type: 'ADD_PAYMENT_TYPE',
	paymentType
});

export const startAddPaymentType = ( paymentTypeName = '' ) =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;

		return database.ref(`subs-tracker/users/${uid}/payment_types`)
			.push(paymentTypeName)
			.then((ref) => 
			{
				dispatch(addPaymentType(
				{
					paymentTypeUuid: ref.key,
					...paymentTypeName
				}));
			});
	}
}

export const setPaymentTypes = ( paymentTypes ) => (
{
	type: 'SET_PAYMENT_NAMES',
	paymentTypes
});