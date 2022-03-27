import { login, logout } from "../../actions/auth";

test('should create a LOGIN action generator', () => 
{
	const uid = 'userID'
	const action = login(uid);

	expect(action).toEqual(
	{
		type: 'LOGIN',
		uid
	});
});

test('should create a LOGOUT action generator', () => 
{
	const action = logout();

	expect(action).toEqual(
	{
		type: 'LOGOUT'
	});
});