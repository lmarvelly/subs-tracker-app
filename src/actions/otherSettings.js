import database from '../firebase/firebase';

export const addSessionType = ( sessionType ) => (
{
	type: 'ADD_SESSION_TYPE',
	sessionType
});

export const startAddSessionType = ( sessionType = '' ) =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;

		return database.ref(`subs-tracker/users/${uid}/session_types`)
			.push(sessionType)
			.then((ref) => 
			{
				dispatch(addSessionType(
				{
					sessionUuid: ref.key,
					...sessionType
				}));
			});
	}
}