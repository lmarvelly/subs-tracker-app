import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	addPaymentType,
	setPaymentTypes,
	startAddPaymentType
} from '../../actions/paymentTypes';
import { paymentTypes } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

test('should create a Add Payment Type Action Objest', () =>
{
	const action = addPaymentType(paymentTypes[0]);
	expect(action).toEqual(
	{
		type: 'ADD_PAYMENT_TYPE',
		paymentType: paymentTypes[0]
	});
});

test('should add a new Payment Type to the database', (done) =>
{
	const store = createMockStore(defaultAuthState);

	const paymentType = 
	{
		paymentTypeName: 'Cryptocurrency'
	};

	const promise = store.dispatch(startAddPaymentType(paymentType)).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'ADD_PAYMENT_TYPE',
			paymentType:
			{
				paymentTypeUuid: expect.any(String),
				...paymentType
			}
		});

		return database.ref(`subs-tracker/users/${uid}/payment_types/${actions[0].paymentType.paymentTypeUuid}`).once('value');
	});

	promise.then((snapshot) =>
	{
		expect(snapshot.val()).toEqual(
			paymentType
		);
		done();
	});
});

test('should create Payment Type action object', () =>
{
	const action = setPaymentTypes( paymentTypes );
	expect(action).toEqual(
	{
		type: 'SET_PAYMENT_NAMES',
		paymentTypes
	});
});