import database from '../firebase/firebase';

export const addSessionName = ( sessionName ) => (
{
	type: 'ADD_SESSION_TYPE',
	sessionName
});

export const startAddSessionName = ( sessionName = '' ) =>
{
	console.log(sessionName);
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;

		return database.ref(`subs-tracker/users/${uid}/session_names`)
			.push(sessionName)
			.then((ref) => 
			{
				dispatch(addSessionName(
				{
					sessionUuid: ref.key,
					...sessionName
				}));
			});
	}
}

export const setSessionName = ( sessionNames ) => (
{
	type: 'SET_SESSION_TYPE',
	sessionNames
});

export const startSetSessionName = () =>
{
	return (dispatch, getState) =>
	{
		const uid = getState().auth.uid;

		return database.ref(`subs-tracker/users/${uid}/session_names`)
			.once('value')
			.then((snapshot) =>
			{
				const sessionNames = [];

				snapshot.forEach( (childSnapshot) =>
				{
					sessionNames.push(
					{
						sessionUuid: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				dispatch( setSessionName( sessionNames ) );
			});
	}
};

export const removeSessionName = ( sessionUuid ) =>(
{
	type: 'REMOVE_SESSION_TYPE',
	sessionUuid
});

export const startRemoveSessionName = ( sessionUuid ) =>
{
	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;

		return database.ref(`subs-tracker/users/${uid}/session_names/${sessionUuid}`)
			.remove()
			.then( () =>
			{
				dispatch( removeSessionName( sessionUuid ) )
			});
	}
}

export const editSessionName = ( sessionUuid, updates ) => (
{
	type: 'EDIT_SESSION_TYPE',
	sessionUuid,
	updates
});

export const startEditSessionName = ( sessionUuid, updates ) =>
{
	const { sessionName } = updates;

	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/session_names/${sessionUuid}`)
			.update({ sessionName })
			.then( () => dispatch( editSessionName( sessionUuid, updates )));
	}
};