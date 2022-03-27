import authReducer from "../../reducers/auth";

test('should set default State', () => 
{
	const state = authReducer( undefined, { type: '@@INIT' } );

	expect(state).toEqual({});
});