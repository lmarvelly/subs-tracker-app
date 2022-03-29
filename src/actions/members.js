import database from '../firebase/firebase';
import { removeRecord } from './records';

export const addMember = ( member ) => (
{
	type: 'ADD_MEMBER',
	member
});

export const startAddMember = ( memberData = {} ) =>
{
	return (dispatch, getState) => 
	{
		const uid = getState().auth.uid
		const {
			firstName = '',
			middleNames = '',
			surname = '',
			nickname = ''
		} = memberData; // Deconstruct member data

		const member = 
		{
			firstName, middleNames, surname, nickname
		}

		return database.ref(`subs-tracker/users/${uid}/members`)
			.push(member)
			.then((ref) =>
			{
				dispatch(addMember(
				{
					playerUuid: ref.key, // the key that firebase generates
					...member
				}));
			});
	};
};

export const editMember = ( playerUuid, updates ) => (
{
	type: 'EDIT_MEMBER',
	playerUuid,
	updates
});

export const startEditMember = ( playerUuid, updates ) =>
{
	const {firstName = '', middleNames = '', surname = '', nickname = ''} = updates;
	return ( dispatch ) =>
	{
		return database.ref(`subs-tracker/members/${playerUuid}`)
			.update({firstName, middleNames, surname, nickname})
			.then(() => dispatch(editMember(playerUuid, {firstName, middleNames, surname, nickname})))
	};
};

export const removeMember = ( playerUuid ) => (
{
	type: 'REMOVE_MEMBER',
	playerUuid
});

export const startRemoveMember = ( playerUuid ) => 
{
	return (dispatch, getState) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/members/${playerUuid}`)
			.remove()
			.then((ref) =>
			{
				dispatch(removeMember(playerUuid));
			});
	}
};

export const setMembers = ( members ) => (
{
	type: 'SET_MEMBERS',
	members
});

export const startSetMembers = () =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/members`)
			.once('value')
			.then((snapshot) =>
			{
				const members = [];

				snapshot.forEach((childSnapshot) =>
				{
					members.push(
					{
						playerUuid: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				dispatch(setMembers( members ));
			});
	};
};