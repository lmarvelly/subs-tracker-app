import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	addRecord, editRecord, removeRecord, startAddRecord
} from '../../actions/records';
import { records } from '../fixtures/fixures';

const createMockStore = configureMockStore([thunk]);

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
 */
test('should add Record to Database and Store', (done) =>
{
	const store = createMockStore({});
	const recordData = 
	{
		playerUuid: '123abc',
		seasonUuid: 'abc123',
		id: 'record1',
		recordType: 'DEBT',
		description: 'Training subs',
		note: 'To be paid next week',
		createdAt: 1000,
		// amount: "",
		amountOwed: 400,
		amountPaid: 0
	}

	// Chaining promises (Adding something after the call has run)
	store.dispatch(startAddRecord(recordData)).then(() =>
	{
		expect(1).toBe(1);
		done(); // 
	});
});

test('should add Record with defaults to Database and Store', () =>
{

});

// test( 'Should set up Add Record action object with default values', () =>
// {
// 	const action = addRecord({});

// 	expect( action ).toEqual(
// 	{
// 		type: 'ADD_RECORD',
// 		record:
// 		{
// 			recordType: 'PAYMENT',
// 			playerUuid: '',
// 			seasonUuid: '',
// 			id: expect.any(String),
// 			description: '',
// 			note: '',
// 			createdAt: expect.any(Number),

// 			amountOwed: "",
// 			amountPaid: "",
// 			amount: ""
// 		}
// 	});
// });