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