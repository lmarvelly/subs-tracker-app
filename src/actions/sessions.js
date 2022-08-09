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

		return database.ref(`subs-tracker/users/${uid}/sessions`)
			.push( session )
			.then(( ref ) => 
			{
				dispatch(addSession(
				{
					id: ref.key,
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

export const startSetSessions = () =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/sessions`)
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

				dispatch(setSessions( sessions ));
			});
	}
}