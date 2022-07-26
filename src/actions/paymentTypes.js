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

export const removePaymentType = ( paymentTypeUuid ) => (
{
	type: 'REMOVE_PAYMENT_TYPE',
	paymentTypeUuid
});

export const setPaymentTypes = ( paymentTypes ) => (
{
	type: 'SET_PAYMENT_TYPES',
	paymentTypes
});

export const startSetPaymentTypes = () => 
{
	return (dispatch, getState) =>
	{
		const uid = getState().auth.uid;

		return database.ref(`subs-tracker/users/${uid}/payment_types`)
			.once('value')
			.then((snapshot) =>
			{
				const paymentTypes = [];

				snapshot.forEach( ( childSnapshot ) =>
				{
					paymentTypes.push(
					{
						paymentTypeUuid: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				// Sort alphabetically ascending
				paymentTypes.sort( (a, b) =>
				{
					const nameA = a.paymentTypeName.toLowerCase();
					const nameB = b.paymentTypeName.toLowerCase();

					if ( nameA < nameB ) return -1;
					if ( nameA > nameB ) return 1;
					return 0;
				});

				dispatch( setPaymentTypes( paymentTypes ) );
			});
	};
};