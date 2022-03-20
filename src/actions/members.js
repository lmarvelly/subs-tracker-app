import database from '../firebase/firebase';

export const addMember = ( member ) => (
{
	type: 'ADD_MEMBER',
	member
});

export const startAddMember = ( memberData = {} ) =>
{
	return (dispatch) => 
	{
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

		return database.ref('subs-tracker/members')
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

export const setMembers = ( members ) => (
{
	type: 'SET_MEMBERS',
	members
});

export const startSetMembers = () =>
{
	return (dispatch) =>
	{
		return database.ref('subs-tracker/members')
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
<<<<<<< HEAD
	};
=======
	}
>>>>>>> 561952b737f1e25b79558b1ccd15a578bc50cd81
};