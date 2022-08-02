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