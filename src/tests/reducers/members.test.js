import membersReducer from '../../reducers/members';
import { members } from '../fixtures/fixures';

test('should set default state', () => 
{
	const state = membersReducer( undefined, { type: '@@INIT' } );

	expect( state ).toEqual([]);
});

test('should remove a member', () => 
{
	const playerUuid = members[1].playerUuid;
	console.log('ID:', playerUuid);
	const action = 
	{ 
		type: 'REMOVE_MEMBER', 
		playerUuid 
	}
	const state = membersReducer( members, action );
	console.log('State', state);

	expect( state ).toEqual([ members[0], members[2] ])
});
