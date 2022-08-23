import sessionReducer from "../../reducers/sessions";
import { members, sessions, sessionNames } from "../fixtures/fixures";

test('should set default state', () =>
{
	const state = sessionReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should Add a new Session', () =>
{
	const session =
	{
		amount: 500,
		createdAt: 1000,
		note: '',
		playerList:
		[{
			playerUuid: members[0].playerUuid,
			discount: 0
		},
		{
			playerUuid: members[1].playerUuid,
			discount: 0
		},
		{
			playerUuid: members[2].playerUuid,
			discount: 100
		},
		{
			playerUuid: members[3].playerUuid,
			discount: 50
		}],
		sessionName: sessionNames[1].sessionName
	}

	const action =
	{
		type: 'ADD_SESSION',
		session
	}

	const state = sessionReducer( sessions, action );

	expect( state ).toEqual([ ...sessions, session ]);
});

test('should Set Sessions', () =>
{
	const action =
	{
		type: 'SET_SESSIONS',
		sessions: [sessions[0]]
	}
	const state = sessionReducer( sessions, action );

	expect( state ).toEqual( [sessions[0]] );
});

test('should edit a Session', () =>
{
	const amount = 600;
	const playerList = [{discount:0, playerUuid: '01234'}];

	const action = 
	{
		type: 'EDIT_SESSION',
		id: sessions[0].id,
		updates:
		{
			amount,
			playerList
		}
	};
	const state = sessionReducer( sessions, action );
	
	expect( state[0].amount ).toBe( amount );
	expect( state[0].playerList ).toBe( playerList );
});

test('should Remove a Session using it\' ID', () =>
{
	const id = sessions[0].id;

	const action =
	{
		type: 'REMOVE_SESSION',
		id
	}

	const state = sessionReducer( sessions, action );

	expect( state ).toEqual([]);
});