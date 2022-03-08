
import moment from 'moment';
import { addRecord, editRecord, removeRecord } from '../../actions/records';
import { records } from '../fixtures/fixures';

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