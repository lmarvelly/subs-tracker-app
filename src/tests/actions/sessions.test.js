import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	addSession,
	startAddSession
} from '../../actions/session';

import { members, sessionNames, sessions,  } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	const sessionsData = {};
	sessions.forEach(({amount, createdAt, note, playerList, 
		sessionName, sessionUuid}) =>
		{
			sessionsData[sessionUuid] = { amount, createdAt, note, 
				playerList, sessionName }
		});

	database.ref(`subs-tracker/users/${uid}/sessions`)
		.set(sessionsData)
		.then(() => done());
});

test('Should create a Add Session action object', () =>
{
	const action = addSession(sessions[0]);

	expect(action).toEqual(
	{
		type: 'ADD_SESSION',
		session: sessions[0]
	});
});

test('Should Add a New Session to the Database', () =>
{
	const store = createMockStore(defaultAuthState);
	const sessionData =
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
		sessionName: sessionNames[1].sessionName,
		sessionUuid: 'asdf'
	}

	const promise = store.dispatch(startAddSession(sessionData))
		.then(() =>
		{
			const actions = store.getActions();
			expect( actions[0] ).toEqual(
			{
				type: 'ADD_SESSION',
				session:
				{
					id: expect.any(String),
					...sessionData
				}
			});
		})
});

	