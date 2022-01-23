import uuid from 'uuid';

export const addMember = ( { firstName = '', middleNames = '', surname = '', nickName = '' } ) => (
{
	type: 'ADD_MEMBER',
	member:
	{
		firstName,
		middleNames,
		surname,
		nickName,
		playerUuid: uuid()
	}
});

export const editMember = ( playerUuid, updates ) => (
{
	type: 'EDIT_MEMBER',
	playerUuid,
	updates
});

export const removeMember = ( playerUuid ) => (
{
	type: 'REMOVE_MEMBER',
	playerUuid
});