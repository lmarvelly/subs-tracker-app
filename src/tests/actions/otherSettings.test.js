import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { 
	addSessionName, editSessionName, startEditSessionName,
	removeSessionName, startAddSessionName, setSessionName, 
	startSetSessionName, startRemoveSessionName
} from '../../actions/otherSettings';
import { sessionNames } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	const sessionNameData = {};
	sessionNames.forEach(({ sessionUuid, sessionName }) =>
	{
		sessionNameData[sessionUuid] = { sessionName };
	});

	database.ref(`subs-tracker/users/${uid}/session_names`)
		.set(sessionNameData)
		.then(() => done());
});

test('should create a Add Session Type Action Objest', () =>
{
	const action = addSessionName(sessionNames[0]);
	expect(action).toEqual(
	{
		type: 'ADD_SESSION_TYPE',
		sessionName: sessionNames[0]
	});
});

test('should add a new Session to the database', (done) =>
{
	const store = createMockStore(defaultAuthState);

	const sessionName = 
	{
		sessionName: 'Kickabout'
	};

	const promise = store.dispatch(startAddSessionName(sessionName)).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'ADD_SESSION_TYPE',
			sessionName:
			{
				sessionUuid: expect.any(String),
				...sessionName
			}
		});

		return database.ref(`subs-tracker/users/${uid}/session_names/${actions[0].sessionName.sessionUuid}`).once('value');
	});

	promise.then((snapshot) =>
	{
		expect(snapshot.val()).toEqual(
			sessionName
		);
		done();
	});
});

test('Create Set Session Type action object', () =>
{
	const action = setSessionName( sessionNames );
	expect(action).toEqual(
	{
		type: 'SET_SESSION_TYPE',
		sessionNames
	});
});

test('should retreive Session Types from database', (done) =>
{
	const store = createMockStore(defaultAuthState);

	store.dispatch(startSetSessionName()).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'SET_SESSION_TYPE',
			sessionNames
		});
		done();
	});
});

test('should create remove Session Type action object', () =>
{
	const sessionUuid = 'testUuid';
	const action = removeSessionName(sessionUuid);

	expect(action).toEqual(
	{
		type:'REMOVE_SESSION_TYPE',
		sessionUuid
	});
});

test('should remove a Session Type from the database', (done) =>
{ 
	const store = createMockStore(defaultAuthState);
	const sessionUuid = sessionNames[1].sessionUuid;
	
	store.dispatch(startRemoveSessionName(sessionUuid))
		.then(() =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'REMOVE_SESSION_TYPE',
				sessionUuid
			});

			return database.ref(`subs-tracker/users/${uid}/session_names/${sessionUuid}`).once('value');
		})
		.then((snapshot) =>
		{
			expect(snapshot.val()).toBeFalsy();
			done();
		});
});

test('should create Edit Session action object', () =>
{
	const sessionUuid = 'testUuid';
	const updates = {sessionName: 'Training'}
	const action = editSessionName( sessionUuid, updates );

	expect( action ).toEqual(
	{
		type: 'EDIT_SESSION_TYPE',
		sessionUuid,
		updates
	});
});

test('should edit a Session Type from the database', (done) =>
{
	const store = createMockStore(defaultAuthState);
	const sessionUuid = sessionNames[1].sessionUuid;
	const updates = { sessionName: 'Kickabout' };

	store.dispatch(startEditSessionName(sessionUuid, updates))
		.then( () =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'EDIT_SESSION_TYPE',
				sessionUuid,
				updates
			});
			return database.ref(`subs-tracker/users/${uid}/session_names/${sessionUuid}`).once('value');
		})
		.then( (snapshot) =>
		{
			expect(snapshot.val().sessionName).toBe(updates.sessionName);
			done();
		});
});