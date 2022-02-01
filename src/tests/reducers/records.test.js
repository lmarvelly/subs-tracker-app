import recordReducer from '../../reducers/records';
import { members, records } from '../fixtures/fixures';

test('should set default state', () => 
{
	const state = recordReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should remove a record using it\'s ID', () => 
{
	const id = records[1].id;
	const action =
	{
		type: 'REMOVE_RECORD',
		id
	}
	const state = recordReducer( records, action );

	expect( state ).toEqual([ records[0], records[2] ]);
});

test('should not remove a record with ID that does not exist', () => 
{
	const id = 'abc';
	const action =
	{
		type: 'REMOVE_RECORD',
		id
	}
	const state = recordReducer( records, action );

	expect( state ).toEqual( records );
});

test('should add a New Payment Record', () => 
{
	const newRecord = 
	{ 
		recordType: 'PAYMENT',
		playerUuid: members[1].playerUuid, 
		description: 'Training subs', 
		amount: 400,
		amountPaid: '',
		amountOwed: '',
		note: ''
	}
	const action = 
	{
		type: 'ADD_RECORD',
		record: newRecord 
	}
	const state = recordReducer( records, action );

	expect( state[3] ).toEqual(newRecord);
});

test('should add a New Debt Record', () => 
{
	const newRecord = 
	{ 
		recordType: 'DEBT',
		playerUuid: members[1].playerUuid, 
		description: '5\'s subs', 
		amount: '',
		amountPaid: 0,
		amountOwed: 500,
		note: ''
	}
	const action = 
	{
		type: 'ADD_RECORD',
		record: newRecord 
	}
	const state = recordReducer( records, action );

	expect( state[3] ).toEqual(newRecord);
});
