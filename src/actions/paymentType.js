import database from '../firebase/firebase';

export const addPaymentType = ( paymentType ) => (
{
	type: 'ADD_PAYMENT_TYPE',
	paymentType
});

