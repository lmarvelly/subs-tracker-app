import database from '../firebase/firebase';

export const addMember = ( member ) => (
{
	type: 'ADD_MEMBER',
	member
});

export const startAddMember = ( memberData = {} ) =>
{
	return (dispatch, getState) => 
	{
		const uid = getState().auth.uid;
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
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/members/${playerUuid}`)
			.update({firstName, middleNames, surname, nickname})
			.then(() => dispatch(editMember(playerUuid, {firstName, middleNames, surname, nickname})))
	};
};

export const removeMember = ( playerUuid ) => (
{
	type: 'REMOVE_MEMBER',
	playerUuid
});

export const startRemoveMember = ( playerUuid, seasonList ) => 
{
	return (dispatch, getState) =>
	{
		let canDelete = true;
		const uid = getState().auth.uid;

		seasonList.forEach( (season) =>
		{
			database.ref(`subs-tracker/users/${uid}/debts_and_payments/${season.seasonUuid}`)
				.once('value')
				.then((records) =>
				{
					records.forEach((childRecord) =>
					{
						if(childRecord.val().playerUuid === playerUuid)
						{
							canDelete = false;
							return true; // breaks loop if record is found
						};
					});
				});
		});

		if(canDelete)
		{
			alert('Deleted');
			return database.ref(`subs-tracker/users/${uid}/members/${playerUuid}`)
				.remove()
				.then((ref) =>
				{
					dispatch(removeMember(playerUuid));
				})
		}
		else
		{
			alert('Cannot Delete. Member has records');
			return false;
		}
	};
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