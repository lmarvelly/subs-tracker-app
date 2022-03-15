import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addRecord, editRecord, removeRecord, startAddRecord, 
	setRecords, startSetRecords
} from '../../actions/records';
import { records } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	const recordsData = {};
	records.forEach(({ id, recordType, playerUuid, seasonUuid, 
		description, note, createdAt, amountOwed, amountPaid, amount 
	}) =>
	{
		recordsData[id] = { recordType, playerUuid, seasonUuid, 
			description, note, createdAt, amountOwed, amountPaid, amount }
	});

	database.ref('subs-tracker/main/records/')
		.set(recordsData)
		.then(() => done());
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
			description: 'Two weeks of Subs',
			amount: 800
		});

		expect( action ).toEqual(
		{
			type: 'EDIT_RECORD',
			id: 'abc123',
			updates: { description: 'Two weeks of Subs', amount: 800 }
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
	const store = createMockStore({});
	const recordData = 
	{
		playerUuid: '123abc',
		seasonUuid: 'abc123',
		recordType: 'DEBT',
		description: 'Training subs',
		note: 'To be paid next week',
		createdAt: 1000,
		amountOwed: 400,
		amountPaid: 0
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
				amount: "",
				...recordData
			}
		});

		return database.ref(`subs-tracker/main/records/${actions[0].record.id}`).once('value');
	})
	
	promise.then((snapshot) => // snapshot contains the values from the last promise
	{
		expect(snapshot.val()).toEqual({amount: "", ...recordData});
		done();
	});
});


test('should add a Payment Record to the Database using the Store', (done) =>
{
	const store = createMockStore({});
	const recordData = 
	{
		playerUuid: '123abc',
		seasonUuid: 'abc123',
		recordType: 'PAYMENT',
		description: 'GFSN GAME',
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
				amountOwed: '',
				amountPaid: '',
				...recordData
			}
		});

		return database.ref(`subs-tracker/main/records/${actions[0].record.id}`).once('value');
		
	});

	promise.then((snapshot) => // snapshot contains the values from the last promise
	{
		expect(snapshot.val()).toEqual(
		{
			note: '', 
			amountOwed: '',
			amountPaid: '',
			...recordData
		});
		done();
	});
});


test('should add Record with defaults to Database and Store', (done) =>
{
	const store = createMockStore({});

	const defaultRecord = 
	{
		recordType: 'PAYMENT',
		playerUuid: '',
		seasonUuid: '',
		description: '',
		note: '',  
		createdAt: 0,
	
		amountOwed: '',
		amountPaid: '',
		amount: 0
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
				...defaultRecord
			}
		});

		return database.ref(`subs-tracker/main/records/${actions[0].record.id}`).once('value');
		
	});
	
	promise.then((snapshot) =>
	{
		expect(snapshot.val()).toEqual(
		{
			...defaultRecord 
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
	const store = createMockStore({});

	store.dispatch(startSetRecords()).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'SET_RECORDS',
			records
		});
		done();
	});
});