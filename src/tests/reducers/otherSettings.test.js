import otherSettingsReducer from "../../reducers/otherSettings";
import { sessionTypeList } from "../fixtures/fixures";

test('should set default state', () =>
{
	const state = otherSettingsReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should add a new Session Type', () =>
{
	const sessionType = 'Kickabout';
	const action = { type: 'ADD_SESSION_TYPE', sessionType };
	const state = otherSettingsReducer( sessionTypeList, action );

	expect( state ).toEqual([ ...sessionTypeList, sessionType ]);
});