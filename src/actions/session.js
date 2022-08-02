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
			sessionName = '',
			sessionUuid = ''
		} = sessionData; // deconstruct Session object

		const session =
		{
			amount, createdAt, note, playerList, seasonUuid, 
			sessionName, sessionUuid
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