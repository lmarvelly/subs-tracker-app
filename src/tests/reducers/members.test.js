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
	const action = 
	{ 
		type: 'REMOVE_MEMBER', 
		playerUuid 
	}
	const state = membersReducer( members, action );

	expect( state ).toEqual([ members[0], members[2] ])
});


