import authReducer from "../../reducers/auth";

test('should set default State', () => 
{
	const state = authReducer( undefined, { type: '@@INIT' } );

	expect(state).toEqual({});
});

test('should set uid for Login', () =>
{
	const uid = 'userID';
	const action = { type: 'LOGIN', uid };
	const state = authReducer( undefined, action );

	expect(state.uid).toBe( uid );
});

test('should clear uid for Logout', () =>
{
	const action = { type: 'LOGOUT' };
	const state = authReducer( { uid: 'anything' }, action );

	expect(state).toEqual({});
});