import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { addSessionType } from '../../actions/otherSettings';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid }}
const createMockStore = configureMockStore([thunk]);
const sessionList = [ 'Training', 'GFSN Game' ];

test('should create a Add Session Type Action Objest', () =>
{
	const action = addSessionType(sessionList[0]);
	expect(action).toEqual(
	{
		type: 'ADD_SESSION_TYPE',
		sessionType: sessionList[0]
	});
});