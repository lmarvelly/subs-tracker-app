import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addSessionType, startAddSessionType } from '../../actions/otherSettings';
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

test('should add a new Session to the database', () =>
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
			...sessionType
		);
		done();
	});
});