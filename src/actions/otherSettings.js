import database from '../firebase/firebase';

export const addSessionName = ( sessionName ) => (
{
	type: 'ADD_SESSION_NAME',
	sessionName
});

export const startAddSessionName = ( sessionName = '' ) =>
{
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
	type: 'SET_SESSION_NAME',
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

				// Sort alphabetically ascending
				sessionNames.sort( (a, b) =>
				{
					const nameA = a.sessionName.toLowerCase();
					const nameB = b.sessionName.toLowerCase();

					if ( nameA < nameB ) return -1;
					if ( nameA > nameB ) return 1;
					return 0;
				})

				dispatch( setSessionName( sessionNames ) );
			});
	}
};

export const removeSessionName = ( sessionUuid ) =>(
{
	type: 'REMOVE_SESSION_NAME',
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
	type: 'EDIT_SESSION_NAME',
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