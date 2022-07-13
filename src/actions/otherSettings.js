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

export const setSessionType = ( sessionTypes ) => (
{
	type: 'SET_SESSION_TYPE',
	sessionTypes
});

export const startSetSessionType = () =>
{
	return (dispatch, getState) =>
	{
		const uid = getState().auth.uid;

		return database.ref(`subs-tracker/users/${uid}/session_types`)
			.once('value')
			.then((snapshot) =>
			{
				const sessionTypes = [];

				snapshot.forEach( (childSnapshot) =>
				{
					sessionTypes.push(
					{
						sessionUuid: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				dispatch( setSessionType( sessionTypes ) );
			});
	}
};

// TODO:

// Edit Session Types

// Delete Session Types