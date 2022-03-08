import { addMember, editMember, removeMember } from "../../actions/members";
import { members } from '../fixtures/fixures';

test('Should add a new members. Some have more properties than others', () => 
{
	const action = addMember( members[0] );
	expect(action).toEqual(
	{
		type: 'ADD_MEMBER',
		member: members[0]
	});


	const action2 = addMember( members[1] );
	expect(action2).toEqual(
	{
		type: 'ADD_MEMBER',
		member: members[1]
	});

	const action3 = addMember( members[3] );
	expect(action3).toEqual(
	{
		type: 'ADD_MEMBER',
		member: members[3]
	});
});

test('Should edit a member', () => 
{
	const action = editMember('querty', { nickname: 'The Rock' })

	expect( action ).toEqual(
	{
		type: 'EDIT_MEMBER',
		playerUuid: 'querty',
		updates: { nickname: 'The Rock' }
	})
});

test('Should remove member', () => 
{
	const action = removeMember('abc123');

	expect( action ).toEqual(
	{
		type: 'REMOVE_MEMBER',
		playerUuid: 'abc123'
	});
});
