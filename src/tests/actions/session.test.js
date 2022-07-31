import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	addSession
} from '../../actions/session';

import { sessions } from '../fixtures/fixures';
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

	database.ref(`subs-tracker/users/${uid}/main/sessions`)
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