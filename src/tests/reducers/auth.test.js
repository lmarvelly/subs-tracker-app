import authReducer from "../../reducers/auth";

test('should set default State', () => 
{
	const state = authReducer( undefined, { type: '@@INIT' } );

	expect(state).toEqual({});
});

test('should Login', () =>
{
	const uid = 'userID';
	const action = { type: 'LOGIN', uid };
	const state = authReducer( undefined, action );

	expect(state).toEqual({ 'uid': uid});
});

test('should Logout', () =>
{
	const action = { type: 'LOGIN' };
	const state = authReducer( undefined, action );

	expect(state).toEqual({});
});