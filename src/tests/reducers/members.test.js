import membersReducer from '../../reducers/members';
import { members } from '../fixtures/fixures';

test('should set default state', () => 
{
	const state = membersReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should Add a New Member', () => 
{
	const member =
	{
		firstName: 'David', 
		middleNames: 'George', 
		surname: 'Marvelly', 
		nickname: 'Davo'
	};
	const action = { type: 'ADD_MEMBER', member };
	const state = membersReducer( members, action );
	
	expect( state ).toEqual([ ...members, member ]);
});

test('should remove a member', () => 
{
	const playerUuid = members[1].playerUuid;
	members.splice(1,1); // remove members[1]
	const action = 
	{ 
		type: 'REMOVE_MEMBER', 
		playerUuid 
	}
	const state = membersReducer( members, action );

	expect( state ).toEqual(members)
});

test('should edit Members First Name', () => 
{
	const firstName = 'David';
	const playerUuid = members[0].playerUuid;

	const action =
	{
		type: 'EDIT_MEMBER',
		playerUuid,
		updates:
		{
			firstName
		}
	}
	const state = membersReducer( members, action );
	expect( state[0].firstName ).toBe('David');
});

test('should set Members', () =>
{
	const action = 
	{
		type: 'SET_MEMBERS',
		members: [members[2]]
	};
	const state = membersReducer( members, action );

	expect( state ).toEqual( [members[2]] );
});