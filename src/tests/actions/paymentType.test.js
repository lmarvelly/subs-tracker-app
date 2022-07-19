import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	addPaymentType
} from '../../actions/paymentType';
import { paymentTypes } from '../fixtures/fixures';
import database from '../../firebase/firebase';

test('should create a Add Payment Type Action Objest', () =>
{
	const action = addPaymentType(paymentTypes[0]);
	expect(action).toEqual(
	{
		type: 'ADD_PAYMENT_TYPE',
		paymentType: paymentTypes[0]
	});
});