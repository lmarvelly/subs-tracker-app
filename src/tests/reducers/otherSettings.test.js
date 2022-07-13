import otherSettingsReducer from "../../reducers/otherSettings";
import { sessionTypes } from "../fixtures/fixures";

test('should set default state', () =>
{
	const state = otherSettingsReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should add a new Session Type', () =>
{
	const sessionType = { sessionName: 'Kickabout at gol' };
	const action = { type: 'ADD_SESSION_TYPE', sessionType };
	const state = otherSettingsReducer( sessionTypes, action );

	expect( state ).toEqual([ ...sessionTypes, sessionType ]);
});

test('should set to be an array of Session Types provided', () =>
{
	const action =
	{
		type: 'SET_SESSION_TYPE',
		sessionTypes
	}
	const state = otherSettingsReducer( undefined, action );

	expect( state ).toEqual( sessionTypes );
});

test('should remove a Session Type', () =>
{
	const sessionUuid = sessionTypes[0].sessionUuid;
	const action =
	{
		type: 'REMOVE_SESSION_TYPE',
		sessionUuid
	};
	const state = otherSettingsReducer( sessionTypes, action );

	const altererSessionList = sessionTypes.filter( ({ sessionUuid }) => sessionUuid !== action.sessionUuid );

	expect(state).toEqual(altererSessionList);
});

