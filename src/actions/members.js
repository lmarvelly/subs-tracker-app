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
			firstName,
			middleNames,
			surname,
			nickname
		} = memberData; // Deconstruct member data

		const member = 
		{
			firstName, middleNames, surname, nickname
		}

		database.ref('subs-tracker/members')
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
						memberUuid: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				console.log(members);// Remove after testing
				dispatch(setMembers( members ));
			});
	}
};