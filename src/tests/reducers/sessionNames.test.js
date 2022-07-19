import sessionNamesReducer from "../../reducers/otherSettings";
import { sessionNames } from "../fixtures/fixures";

test('should set default state', () =>
{
	const state = sessionNamesReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should add a new Session Type', () =>
{
	const sessionName = { sessionName: 'Kickabout at gol' };
	const action = { type: 'ADD_SESSION_NAME', sessionName };
	const state = sessionNamesReducer( sessionNames, action );

	expect( state ).toEqual([ ...sessionNames, sessionName ]);
});

test('should set to be an array of Session Types provided', () =>
{
	const action =
	{
		type: 'SET_SESSION_NAME',
		sessionNames
	}
	const state = sessionNamesReducer( undefined, action );

	expect( state ).toEqual( sessionNames );
});

test('should remove a Session Type', () =>
{
	const sessionUuid = sessionNames[0].sessionUuid;
	const action =
	{
		type: 'REMOVE_SESSION_NAME',
		sessionUuid
	};
	const state = sessionNamesReducer( sessionNames, action );

	const altererSessionList = sessionNames.filter( ({ sessionUuid }) => sessionUuid !== action.sessionUuid );

	expect(state).toEqual(altererSessionList);
});

test('should edit a Session Type', () =>
{
	const sessionName = 'Kickabout at Gol';
	const sessionUuid = sessionNames[0].sessionUuid;

	const action =
	{
		type: 'EDIT_SESSION_NAME',
		sessionUuid,
		updates:
		{
			sessionName
		}
	};

	const state = sessionNamesReducer( sessionNames, action );

	expect(state[0].sessionName).toBe(sessionName);
});