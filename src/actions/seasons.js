import database from '../firebase/firebase';

export const addSeason = ( season ) => (
{
	type: 'ADD_SEASON',
	season
});

export const startAddSeason = ( seasonData = {} ) =>
{
	return (dispatch, getState) =>
	{
		const uid = getState().auth.uid;
		const { seasonName = '' } = seasonData;
		const season = { seasonName };

		return database.ref(`subs-tracker/users/${uid}/seasons`)
			.push(season)
			.then((ref) => 
			{
				dispatch(addSeason(
				{
					seasonUuid: ref.key,
					...season
				}));
			});
	};
};

export const startEditSeason = ( seasonUuid, updates ) =>
{
	const { seasonName } = updates;

	return ( dispatch, getState ) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/seasons/${seasonUuid}`)
			.update({ seasonName })
			.then( () => dispatch( editSeason( seasonUuid, updates )));
	}
}; 

export const editSeason = ( seasonUuid, updates ) => (
{
	type: 'EDIT_SEASON',
	seasonUuid,
	updates
});

export const removeSeason = (seasonUuid) =>
({
	type: 'REMOVE_SEASON',
	seasonUuid
});

export const startRemoveSeason = ( seasonUuid ) =>
{
	return (dispatch, getState) =>
	{
		let canDelete = true;
		const uid = getState().auth.uid;

		database.ref(`subs-tracker/users/${uid}/debts_and_payments/${seasonUuid}`)
			.once('value')
			.then((snapshot) =>
			{
				snapshot.forEach(() =>
				{
					canDelete = false;
					return true;
				});
			}
		);

		return database.ref(`subs-tracker/users/${uid}/sessions/${seasonUuid}`)
			.once('value')
			.then((snapshot) =>
			{
				snapshot.forEach(() =>
				{
					canDelete = false;
					return true;
				});

				if(canDelete)
				{
					alert('Season deleted');
					return database.ref(`subs-tracker/users/${uid}/seasons/${seasonUuid}`)
						.remove()
						.then((ref) =>
						{
							dispatch(removeSeason(seasonUuid));
						})
				}
				else
				{
					alert('Cannot Delete. Season contains records');
				}
			}
		);
	}
};

export const setSeasons = ( seasons ) => (
{
	type: 'SET_SEASONS',
	seasons
});

export const startSetSeasons = () =>
{
	return (dispatch, getState) =>
	{
		const uid = getState().auth.uid;
		return database.ref(`subs-tracker/users/${uid}/seasons`)
			.once('value')
			.then((snapshot) =>
			{
				const seasons = [];

				snapshot.forEach((childSnapshot) =>
				{
					seasons.push(
					{
						seasonUuid: childSnapshot.key,
						...childSnapshot.val()
					});
				});

				dispatch(setSeasons( seasons ));
			});
	}
};