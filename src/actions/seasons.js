import database from '../firebase/firebase';

export const addSeason = ( season ) => (
{
	type: 'ADD_SEASON',
	season
});

export const startAddSeason = ( seasonData = {} ) =>
{
	return (dispatch) =>
	{
		const { seasonName = '' } = seasonData;
		const season = { seasonName };

		return database.ref('subs-tracker/seasons')
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

	return ( dispatch ) =>
	{
		return database.ref(`subs-tracker/seasons/${seasonUuid}`)
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
	return (dispatch) =>
	{
		return database.ref(`subs-tracker/seasons/${seasonUuid}`)
			.remove()
			.then((ref) =>
			{
				dispatch(removeSeason(seasonUuid));
			});
	}
};

export const setSeasons = ( seasons ) => (
{
	type: 'SET_SEASONS',
	seasons
});

export const startSetSeasons = () =>
{
	return (dispatch) =>
	{
		return database.ref('subs-tracker/seasons')
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