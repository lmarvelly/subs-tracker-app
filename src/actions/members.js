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
		const uid = getState().auth.uid;

		const recordPromises = seasonList.map( (season) =>
			database.ref(`subs-tracker/users/${uid}/debts_and_payments/${season.seasonUuid}`)
				.once('value')
				.then((records) =>
					records.forEach((childRecord) => // breaks on true
						childRecord.val().playerUuid === playerUuid
					)
				)
      );

		const sessionPromises = seasonList.map( (season) =>
			database.ref(`subs-tracker/users/${uid}/sessions/${season.seasonUuid}`)
				.once('value')
				.then((sessions) => 
					sessions.forEach((childSession) =>
						childSession.val().playerList.some( (player) => // should break on true
							player.playerUuid === playerUuid
						)
					)
				)
      );
		
		const promises = recordPromises.concat(sessionPromises);

      return Promise.all(promises).then(findings =>
			findings.includes(true)
		)
		.then(cannotDelete => 
		{
			if (cannotDelete) 
			{
				alert('Cannot Delete. Member has records');
				return false;
			} 
			else 
			{
				alert('Deleted');
				return database.ref(`subs-tracker/users/${uid}/members/${playerUuid}`)
					.remove()
					.then((ref) => 
					{
						dispatch(removeMember(playerUuid)); // Calls removeMember() function to remove the Member from the State of the App
						return true; // To distinguish from false
					}
				);
			}
		});
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