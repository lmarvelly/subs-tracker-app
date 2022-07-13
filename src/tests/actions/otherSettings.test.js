import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { 
	addSessionType, editSessionType, startEditSessionType,
	removeSessionType, startAddSessionType, setSessionType, 
	startSetSessionType, startRemoveSessionType
} from '../../actions/otherSettings';
import { sessionTypes } from '../fixtures/fixures';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);

beforeEach((done) =>
{
	const sessionTypeData = {};
	sessionTypes.forEach(({ sessionUuid, sessionName }) =>
	{
		sessionTypeData[sessionUuid] = { sessionName };
	});

	database.ref(`subs-tracker/users/${uid}/session_types`)
		.set(sessionTypeData)
		.then(() => done());
});

test('should create a Add Session Type Action Objest', () =>
{
	const action = addSessionType(sessionTypes[0]);
	expect(action).toEqual(
	{
		type: 'ADD_SESSION_TYPE',
		sessionType: sessionTypes[0]
	});
});

test('should add a new Session to the database', (done) =>
{
	const store = createMockStore(defaultAuthState);

	const sessionType = 
	{
		sessionName: 'Kickabout'
	};

	const promise = store.dispatch(startAddSessionType(sessionType)).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'ADD_SESSION_TYPE',
			sessionType:
			{
				sessionUuid: expect.any(String),
				...sessionType
			}
		});

		return database.ref(`subs-tracker/users/${uid}/session_types/${actions[0].sessionType.sessionUuid}`).once('value');
	});

	promise.then((snapshot) =>
	{
		expect(snapshot.val()).toEqual(
			sessionType
		);
		done();
	});
});

test('Create Set Session Type action object', () =>
{
	const action = setSessionType( sessionTypes );
	expect(action).toEqual(
	{
		type: 'SET_SESSION_TYPE',
		sessionTypes
	});
});

test('should retreive Session Types from database', (done) =>
{
	const store = createMockStore(defaultAuthState);

	store.dispatch(startSetSessionType()).then(() =>
	{
		const actions = store.getActions();
		expect(actions[0]).toEqual(
		{
			type: 'SET_SESSION_TYPE',
			sessionTypes
		});
		done();
	});
});

test('should create remove Session Type action object', () =>
{
	const sessionUuid = 'testUuid';
	const action = removeSessionType(sessionUuid);

	expect(action).toEqual(
	{
		type:'REMOVE_SESSION_TYPE',
		sessionUuid
	});
});

test('should remove a Session Type from the database', (done) =>
{ 
	const store = createMockStore(defaultAuthState);
	const sessionUuid = sessionTypes[1].sessionUuid;
	
	store.dispatch(startRemoveSessionType(sessionUuid))
		.then(() =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'REMOVE_SESSION_TYPE',
				sessionUuid
			});

			return database.ref(`subs-tracker/users/${uid}/session_types/${sessionUuid}`).once('value');
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
	const action = editSessionType( sessionUuid, updates );

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
	const sessionUuid = sessionTypes[1].sessionUuid;
	const updates = { sessionName: 'Kickabout' };

	store.dispatch(startEditSessionType(sessionUuid, updates))
		.then( () =>
		{
			const actions = store.getActions();
			expect(actions[0]).toEqual(
			{
				type: 'EDIT_SESSION_TYPE',
				sessionUuid,
				updates
			});
			return database.ref(`subs-tracker/users/${uid}/session_types/${sessionUuid}`).once('value');
		})
		.then( (snapshot) =>
		{
			expect(snapshot.val().sessionName).toBe(updates.sessionName);
			done();
		});
});