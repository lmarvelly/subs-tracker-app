import database from '../firebase/firebase';

export const addSession = ( session ) => (
{
	type: 'ADD_SESSION',
	session
});

export const startAddSession = ( sessionData = {} ) =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		const {
			amount = '',
			createdAt = 0,
			note = '',
			playerList = [],
			seasonUuid = '',
			sessionName = ''
		} = sessionData; // deconstruct Session object

		const session =
		{
			amount, createdAt, note, playerList, seasonUuid, 
			sessionName
		}

		return database.ref(`subs-tracker/users/${uid}/sessions/${seasonUuid}`)
			.push( session )
			.then(( ref ) => 
			{
				dispatch(addSession(
				{
					id: ref.key,
					recordType: 'SESSION',
					...session
				}));
			});
	}
};

export const setSessions = ( sessions ) => (
{
	type: 'SET_SESSIONS',
	sessions
});

export const startSetSessions = ( seasonUuid ) =>
{
	if ( seasonUuid ) 
	{
		return ( dispatch, getState ) =>
		{
			const uid = getState().auth.uid;
			return database.ref(`subs-tracker/users/${uid}/sessions/${seasonUuid}`)
				.once('value')
				.then((snapshot) =>
				{
					const sessions = [];

					snapshot.forEach((childSnapshot) =>
					{
						sessions.push(
						{
							id: childSnapshot.key,
							...childSnapshot.val()
						});
					});

					// Adding 'SESSION' record type identifier to each Session
					sessions.forEach((session) =>
					{
						const index = sessions.findIndex( (currentSession) =>
						{
							return session.id === currentSession.id;
						});

						sessions[index] = {...session, recordType: 'SESSION'}
					})

					dispatch(setSessions( sessions ));
				});
		}
	}
	else
	{
		return ( dispatch, getState ) =>
		{
			const uid = getState().auth.uid;
			const seasons = [];

			database.ref(`subs-tracker/users/${uid}/seasons`)
				.once('value')
				.then((snapshot) =>
				{
					snapshot.forEach((childSnapshot) =>
					{
						seasons.push(childSnapshot.key);
					})
				});

				return database.ref(`subs-tracker/users/${uid}/sessions/${seasons[0]}`)
					.once('value')
					.then((snapshot) =>
					{
						const sessions = [];

						snapshot.forEach((childSnapshot) =>
						{
							sessions.push(
							{
								id: childSnapshot.key,
								...childSnapshot.val()
							});
						});

						// Adding 'SESSION' record type identifier to each Session
						sessions.forEach((session) =>
						{
							const index = sessions.findIndex( (currentSession) =>
							{
								return session.id === currentSession.id;
							});

							sessions[index] = {...session, recordType: 'SESSION'}
						})

						dispatch(setSessions( sessions ));
					});
		}
	}
}

export const editSession = ( id, updates ) => (
{
	type: 'EDIT_SESSION',
	id,
	updates
});

export const startEditSession = ( id, updates ) =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/sessions/${id}`)
			.update(updates)
			.then(() => dispatch(editSession(id, updates)));
	};
};

export const removeSession = ( { id } = {} ) => (
{
	type: 'REMOVE_SESSION',
	id
});

export const startRemoveSession = ( { id } = {} ) =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;

		return database.ref(`subs-tracker/users/${uid}/sessions/${id}`)
			.remove()
			.then((ref) =>
			{
				dispatch(removeSession({ id }));
			});
	};
};