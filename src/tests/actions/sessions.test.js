import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	addSession,
	editSession,
	removeSession,
	setSessions,
	startAddSession,
	startEditSession,
	startRemoveSession,
	startSetSessions
} from '../../actions/sessions';

import { members, seasons, sessionNames, sessions } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	database.ref(`subs-tracker/users/${uid}/sessions`)
		.set([]);

	sessions.forEach(({amount, createdAt, note, playerList, 
		seasonUuid, sessionName, id}) =>
		{
			const sessionsData = { id, amount, createdAt, note, 
				playerList, seasonUuid, sessionName }

			database.ref(`subs-tracker/users/${uid}/sessions/${sessionsData.seasonUuid}/${sessionsData.id}`)
				.set(sessionsData)
				.then(() => done());
		}
	);
	
	const seasonsData = {};
	seasons.forEach(({ seasonUuid, seasonName }) =>
	{
		seasonsData[seasonUuid] = { seasonName };
	});

	database.ref(`subs-tracker/users/${uid}/seasons`)
		.set(seasonsData)
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

test('Should Add a New Session to the Database', (done) =>
{
	const store = createMockStore(defaultAuthState);
	const sessionData =
	{
		amount: 500,
		createdAt: 2000,
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
		seasonUuid: seasons[0].seasonUuid,
		sessionName: sessionNames[1].sessionName
	}

	// Clear Session Data for seasons[0].seasonUuid 
	database.ref(`subs-tracker/users/${uid}/sessions/${seasons[0].seasonUuid}/`).set([]);

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
					...sessionData, 
					recordType: "SESSION"
				}
			});
			return database.ref(`subs-tracker/users/${uid}/sessions/${sessionData.seasonUuid}/${actions[0].session.id}`).once('value');
		});

		promise.then((snapshot) =>
		{
			expect(snapshot.val()).toEqual(sessionData);
			done();
		});
});

test('should create a Set Session Action Object', () => 
{
	const action = setSessions(sessions);
	expect(action).toEqual(
	{
		type: 'SET_SESSIONS',
		sessions: sessions
	});
});

test('should fetch Sessions from database', (done) =>
{
	const store = createMockStore(defaultAuthState);

	const seasonUuid = seasons[1].seasonUuid;

	store.dispatch(startSetSessions(seasonUuid)).then(() =>
	{
		const actions = store.getActions();

		expect(actions[0]).toEqual(
		{
			type: 'SET_SESSIONS',
			sessions: [sessions[0], sessions[2], sessions[3], sessions[4], sessions[5]]
		});
		done();
	});
});

// This test is not working correctly
test('should fetch Default Sessions from database', (done) =>
{
	const store = createMockStore(defaultAuthState);

	store.dispatch(startSetSessions()).then(() =>
	{
		const actions = store.getActions();
		expect( actions[0] ).toEqual(
		{
			type: 'SET_SESSIONS',
			sessions: [ sessions[1] ]
		});
		done();
	})
});

test('should create an Edit Action Generator', () =>
{
	const action = editSession(
		'abc123',
		{
			playerList: [{discount:0, playerUuid: '01234'}]
		}
	);

	expect( action ).toEqual(
	{
		type: 'EDIT_SESSION',
		id: 'abc123',
		updates:
		{
			playerList: [{discount:0, playerUuid: '01234'}]
		}
	});
});

test('Should Edit a Session in the Database', (done) =>
{
	const store = createMockStore(defaultAuthState);
	const id = sessions[0].id;
	const playerUuid = sessions[0].playerList[1].playerUuid;
	const seasonUuid = sessions[0].seasonUuid;
	const updates = 
	{
		playerList: [{discount: 50, playerUuid}]
	};

	store.dispatch(startEditSession(id, seasonUuid, updates))
		.then(() =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'EDIT_SESSION',
				id,
				updates
			});

			return database.ref(`subs-tracker/users/${uid}/sessions/${seasonUuid}/${id}`).once('value');
		}).then((snapshot) =>
		{
			expect( snapshot.val().playerList ).toEqual( [{discount: 50, playerUuid}] );
			done();
		});
});

test('should create a Remove Session action generator', () => 
{
	const id = 'someID';
	const action = removeSession({id});

	expect(action).toEqual(
	{
		type: 'REMOVE_SESSION',
		id
	});
});

test('should Remove a Session Object from the Database', (done) =>
{
	const store = createMockStore(defaultAuthState);
	const id = sessions[0].id;
	const seasonUuid = sessions[0].seasonUuid;

	store.dispatch(startRemoveSession(id, seasonUuid))
	.then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'REMOVE_SESSION',
			id
		});

		return database.ref(`subs-tracker/users/${uid}/sessions/${seasonUuid}/${id}`).once('value');
	})
	.then((snapshot) =>
	{
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});