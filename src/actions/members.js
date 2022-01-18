import uuid from 'uuid';

export const addMember = ( {fullName = '', nickName = ''} ) => (
	console.log('addMember(): ',fullName, nickName),
{
	type: 'ADD_MEMBER',
	member:
	{
		fullName,
		nickName,
		playerUuid: uuid()
	}
});

export const removeMember = ( playerUuid ) => (
{
	type: 'REMOVE_MEMBER',
	playerUuid
});