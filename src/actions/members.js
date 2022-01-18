import uuid from 'uuid';

export const addMember = ( name, nickName = '' ) => (
{
	type: 'ADD_MEMBER',
	member:
	{
		name,
		nickName,
		playerUuid: uuid()
	}
});

export const removeMember = ( playerUuid ) => (
	console.log('Removing Member: ', playerUuid),
{
	type: 'REMOVE_MEMBER',
	playerUuid
});