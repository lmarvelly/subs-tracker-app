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
			amount = 0,
			createdAt = 0,
			note = '',
			playerList = [],
			sessionName = '',
			sessionUuid = ''
		} = sessionData; // deconstruct Session object

		const session =
		{
			amount, createdAt, note, playerList, sessionName, 
			sessionUuid
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