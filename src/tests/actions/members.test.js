import { addMember, editMember, removeMember } from "../../actions/members";

test('Should add a new members. Some have more properties than others', () => 
{
	const newMember = { firstName: 'Luke', surname: 'Marvelly' };
	const action = addMember( newMember );
	expect(action).toEqual(
	{
		type: 'ADD_MEMBER',
		member: 
		{
			playerUuid: expect.any(String),
			firstName: 'Luke',
			middleNames: '', 
			surname: 'Marvelly',
			nickName: '',
		}
	});


	const newMember2 = { firstName: 'Harri', surname: 'Messenger', middleNames: 'Jason' };
	const action2 = addMember( newMember2 );
	expect(action2).toEqual(
	{
		type: 'ADD_MEMBER',
		member: 
		{
			playerUuid: expect.any(String),
			firstName: 'Harri',
			middleNames: 'Jason', 
			surname: 'Messenger',
			nickName: '',
		}
	});

	const newMember3 = { firstName: 'Jason', surname: 'Cousins', middleNames: 'Jacub', nickName: 'Oldest Dragon' };
	const action3 = addMember( newMember3 );
	expect(action3).toEqual(
	{
		type: 'ADD_MEMBER',
		member: 
		{
			playerUuid: expect.any(String),
			firstName: 'Jason',
			middleNames: 'Jacub', 
			surname: 'Cousins',
			nickName: 'Oldest Dragon',
		}
	});
});

test('Should edit a member', () => 
{
	const action = editMember('querty', { nickName: 'The Rock' })

	expect( action ).toEqual(
	{
		type: 'EDIT_MEMBER',
		playerUuid: 'querty',
		updates: { nickName: 'The Rock' }
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
