import { addSession } from "../../actions/sessions";
import { session1 } from "../fixtures/fixures";

test('should create Session action generator', () =>
{
	const action = addSession( session1 );
	expect( action ).toEqual(
	{
		type: 'ADD_SESSION',
		session: session1
	});
});