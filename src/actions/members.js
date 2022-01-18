import uuid from 'uuid';

export const addMember = ( name, nickName = '' ) => (
console.log('ADD MEMBER'),
{
	type: 'ADD_MEMBER',
	member:
	{
		name,
		nickName,
		playerUuid: uuid()
	}
});