import recordReducer from '../../reducers/records';
import { members, records, seasons } from '../fixtures/fixures';

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

	expect( state ).toEqual([ records[0], records[2], records[3], records[4] ]);
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
	const record = 
	{ 
		recordType: 'PAYMENT',
		playerUuid: members[1].playerUuid,
		seasonUuid: seasons[0],
		sessionName: 'Training subs', 
		amount: 400,
		amountPaid: '',
		amountOwed: '',
		note: ''
	}
	const action = 
	{
		type: 'ADD_RECORD',
		record 
	}
	const state = recordReducer( records, action );

	expect( state[5] ).toEqual(record);
	expect( state ).toEqual([ ...records, record ]);
});

test('should add a New Debt Record', () => 
{
	const newRecord = 
	{ 
		recordType: 'DEBT',
		playerUuid: members[1].playerUuid,
		seasonUuid: seasons[1].seasonUuid,
		sessionName: '5\'s subs', 
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

	expect( state[5] ).toEqual(newRecord);
});

test('should edit a Payment Record', () => 
{
	const sessionName = 'Training subs';
	const amount = 400;
	const seasonUuid = seasons[0];
	const updates = { sessionName, amount, seasonUuid }
	const action =
	{
		type: 'EDIT_RECORD',
		id: records[2].id,
		updates
	}
	const state = recordReducer( records, action );

	expect( state[2].sessionName ).toBe(sessionName);
	expect( state[2].amount ).toBe(amount);
});

test('should edit a Debt Record', () => 
{
	const sessionName = '5s subs';
	const amountOwed = 500;
	const note = 'Will pay on Monday';
	const updates = { sessionName, amountOwed, note };
	const action =
	{
		type: 'EDIT_RECORD',
		id: records[0].id,
		updates
	};
	const state = recordReducer( records, action );

	expect( state[0].sessionName ).toBe(sessionName);
	expect( state[0].amountOwed ).toBe(amountOwed);
	expect( state[0].note ).toBe(note);
});

test('should not edit a Payment Record if not found', () => 
{
	const updates = { sessionName: 'Training subs', amount: 500 }
	const action =
	{
		type: 'EDIT_RECORD',
		id: 'abc',
		updates
	}
	const state = recordReducer( records, action );

	expect( state ).toEqual( records );
});


test('should set records', () => 
{
	const action =
	{
		type: 'SET_RECORDS',
		records: [records[2]]
	}
	const state = recordReducer( records, action )

	expect( state ).toEqual( [records[2]] );
});