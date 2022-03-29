import { login, logout } from "../../actions/auth";

test('should create a LOGIN action object', () => 
{
	const uid = 'userID'
	const action = login(uid);

	expect(action).toEqual(
	{
		type: 'LOGIN',
		uid
	});
});

test('should create a LOGOUT action object', () => 
{
	const action = logout();

	expect(action).toEqual(
	{
		type: 'LOGOUT'
	});
});