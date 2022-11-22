import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	addRecord,
	startAddRecord,
	editRecord,
	removeRecord,
	startRemoveRecord,
	setRecords,
	startSetRecords,
	startEditRecord
} from '../../actions/records';
import { records, seasons } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	records.forEach(({ id, recordType, playerUuid, seasonUuid, 
		sessionName, note, createdAt, amount 
	}) =>
	{
		const recordData = {id, recordType, playerUuid, seasonUuid, 
			sessionName, note, createdAt, amount }

		database.ref(`subs-tracker/users/${uid}/debts_and_payments/${recordData.seasonUuid}/${recordData.id}`)
			.update(recordData)
			.then(() => done());
	});
});

/**
 * We use toEqual because when we use toBe() it compares two 
 * objects. Two different objects, even with the same properties,
 * are never going to equal each other.
 */
test( 'Should set up remove Record action object', () =>
{
	const action = removeRecord({ id: 'qwerty' });

	expect(action).toEqual(
	{
		type: 'REMOVE_RECORD',
		id: 'qwerty'
	});
});

test( 'Should set up edit Record action object', () =>
{
	const action = editRecord( 
		'abc123',
		{ 
			sessionName: 'Two weeks of Subs',
			amount: 800
		}
	);

	expect( action ).toEqual(
	{
		type: 'EDIT_RECORD',
		id: 'abc123',
		updates: { sessionName: 'Two weeks of Subs', amount: 800 }
	});
});

test( 'Should set up Add Record action object with provided values', () =>
{
	const action = addRecord( records[3] );

	expect( action ).toEqual(
	{
		type: 'ADD_RECORD',
		record: records[3]
	});
});

/**
 * @param done This test case will only pass if done() is called.
 * This forces Jest() to wait until the moment in time that done()
 * is called.
 * 
 * Chaining promises (Adding something after the call has run)
 * Following the chain:
 *  	createMockstore --> dispatch() --> startAddRecord() --> addRecord()
 * 	The actual object is returned from addRecord()
 * 		type: 'ADD_RECORD',
 * 		record
 */
test('should add Debt Record to the Database using the Store', (done) =>
{
	const store = createMockStore(defaultAuthState);
	const recordData = 
	{
		playerUuid: '123abc',
		seasonUuid: 'abc123',
		recordType: 'DEBT',
		sessionName: 'Training subs',
		note: 'To be paid next week',
		createdAt: 1000,
		amount: 400
	}

	const promise = store.dispatch(startAddRecord(recordData)).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'ADD_RECORD', 
			record:
			{
				id: expect.any(String),
				...recordData
			}
		});

		return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${recordData.seasonUuid}/${actions[0].record.id}`).once('value');
	})
	
	promise.then((snapshot) => // snapshot contains the values from the last promise
	{
		expect(snapshot.val()).toEqual({amount: "", ...recordData});
		done();
	});
});


test('should add a Payment Record to the Database using the Store', (done) =>
{
	const store = createMockStore(defaultAuthState);
	const recordData = 
	{
		playerUuid: '123abc',
		seasonUuid: 'abc123',
		recordType: 'PAYMENT',
		sessionName: 'GFSN GAME',
		createdAt: 1000,
		amount: 250
	}

	const promise = store.dispatch(startAddRecord(recordData)).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'ADD_RECORD', 
			record:
			{
				id: expect.any(String),
				note: '',
				...recordData
			}
		});

		return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${recordData.seasonUuid}/${actions[0].record.id}`).once('value');
		
	});

	promise.then((snapshot) => // snapshot contains the values from the last promise
	{
		expect(snapshot.val()).toEqual(
		{
			note: '',
			...recordData
		});
		done();
	});
});


test('should add Record with defaults to Database and Store', (done) =>
{
	const store = createMockStore(defaultAuthState);

	const defaultRecord = 
	{
		recordType: 'PAYMENT',
		playerUuid: '',
		seasonUuid: '',
		sessionName: '',
		note: '',
		createdAt: 0,
		amount: ''
	}

	const promise = store.dispatch(startAddRecord({})).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'ADD_RECORD', 
			record: 
			{
				id: expect.any(String),
				...defaultRecord,
				seasonUuid: 'undefined'
			}
		});
		
		return database.ref(`subs-tracker/users/${uid}/debts_and_payments/undefined/${actions[0].record.id}`).once('value');
	});
	
	promise.then((snapshot) =>
	{
		expect(snapshot.val()).toEqual(
		{
			...defaultRecord,
			seasonUuid: 'undefined'
		});
		done();
	});
});

test('should setup set record action object with data', () => 
{ 
	const action = setRecords(records);
	expect(action).toEqual(
	{
		type: 'SET_RECORDS',
		records
	});
});

/**
 * Use done to tell jest that this test is a failier if done() is
 * not called
 */ 
test('should fetch records from firebase', (done) =>
{
	const store = createMockStore(defaultAuthState);

	store.dispatch(startSetRecords(seasons[2].seasonUuid)).then(() =>
	{
		const actions = store.getActions();

		expect(actions[0]).toEqual(
		{
			type: 'SET_RECORDS',
			records: [records[0], records[2]]
		});
		done();
	});
});

test('should remove a record from test database', (done) => 
{
	const store = createMockStore(defaultAuthState);
	const id = records[0].id;
	const seasonUuid = records[0].seasonUuid;

	store.dispatch(startRemoveRecord({ id, seasonUuid }))
	.then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'REMOVE_RECORD',
			id
		});
		// Return the value a single time
		return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${seasonUuid}/${id}`).once('value');
	})
	.then((snapshot) =>
	{
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});

// Editing fine but not returning promise for snapshot
test('should edit a Debt record on the database', (done) => 
{
	const store = createMockStore(defaultAuthState);
	const id = records[0].id;
	const seasonUuid = records[0].seasonUuid;
	const updates = 
	{
		amount: 500
	}

	const promise = store.dispatch(startEditRecord(id, seasonUuid, updates))
		.then(() =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'EDIT_RECORD',
				id,
				updates:
				{
					...updates
				}
			});

			return database.ref(`subs-tracker/users/${uid}/debts_and_payments/${seasonUuid}/${id}`).once('value');
		}).then((snapshot) =>
		{
			expect(snapshot.val().amount).toBe(500);
			done();
		});
});