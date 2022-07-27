import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	addPaymentType,
	editPaymentType,
	removePaymentType,
	setPaymentTypes,
	startAddPaymentType,
	startEditPaymentType,
	startRemovePaymentType,
	startSetPaymentTypes
} from '../../actions/paymentTypes';
import { paymentTypes } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

let store;

beforeEach((done) =>
{
	const paymentTypeData = {};
	paymentTypes.forEach(({ paymentTypeName, paymentTypeUuid }) =>
	{
		paymentTypeData[paymentTypeUuid] = { paymentTypeName }
	});
	database.ref(`subs-tracker/users/${uid}/payment_types`)
		.set( paymentTypeData )
		.then(() => done());

	store = createMockStore(defaultAuthState);
});

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
		type: 'SET_PAYMENT_TYPES',
		paymentTypes
	});
});

test('should Retrieve the Payment Types from the Database', (done) =>
{
	const sortedPaymentTypes = paymentTypes.sort( (a, b) =>
	{
		const nameA = a.paymentTypeName.toLowerCase();
		const nameB = b.paymentTypeName.toLowerCase();

		if ( nameA < nameB ) return -1;
		if ( nameA > nameB ) return 1;
		return 0;
	});

	store.dispatch( startSetPaymentTypes() ).then( () => 
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'SET_PAYMENT_TYPES',
			paymentTypes: sortedPaymentTypes
		});
		done();
	});
});

test('should Remove a Payment Type from the Database', () =>
{
	const paymentTypeUuid = 'testUuid';
	const action = removePaymentType( paymentTypeUuid );

	expect(action).toEqual(
	{
		type: 'REMOVE_PAYMENT_TYPE',
		paymentTypeUuid
	});
});

test('should Remove a Payment Type from the database', (done) =>
{
	const paymentTypeUuid = paymentTypes[0].paymentTypeUuid;

	store.dispatch( startRemovePaymentType( paymentTypeUuid ) )
		.then( () =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'REMOVE_PAYMENT_TYPE',
				paymentTypeUuid
			});

			return database.ref(`subs-tracker/users/${uid}/payment_types/${paymentTypeUuid}`).once('value');
		})
		.then((snapshot) =>
		{
			expect(snapshot.val()).toBeFalsy();
			done();
		});
});

test('should create an Edit Action Object', () =>
{
	const paymentTypeUuid = 'testUuid';
	const updates = { paymentTypeName: 'Leaves' };
	const action = editPaymentType( paymentTypeUuid, updates );

	expect( action ).toEqual(
	{
		type: 'EDIT_PAYMENT_TYPE',
		paymentTypeUuid,
		updates
	});
});

test('should edit a Session Type from the database', (done) =>
{
	const store = createMockStore(defaultAuthState);
	const paymentTypeUuid = paymentTypes[1].paymentTypeUuid;
	const updates = { paymentTypeName: 'Leaves' };

	store.dispatch( startEditPaymentType( paymentTypeUuid, updates ))
		.then( () =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'EDIT_PAYMENT_TYPE',
				paymentTypeUuid,
				updates
			});
			return database.ref(`subs-tracker/users/${uid}/payment_types/${paymentTypeUuid}`).once('value');
		})
		.then((snapshot) =>
		{
			expect(snapshot.val().paymentTypeName).toBe( updates.paymentTypeName );
			done();
		});
});