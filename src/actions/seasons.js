import uuid from 'uuid';

export const addSeason = ({ seasonName = '', seasonUuid = '' }) => (
{
	type: 'ADD_SEASON',
	season:
	{
		seasonName,
		seasonUuid: uuid()
	}
});

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