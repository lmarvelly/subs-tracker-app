import uuid from 'uuid';

export const addSeason = ({ seasonName = '', seasonUuid = '' }) =>(
{
	type: 'ADD_SEASON',
	season:
	{
		seasonName,
		seasonUuid: uuid()
	}
});

export const removeSeason = (seasonUuid) =>
({
	type: 'DELETE_SEASON',
	seasonUuid
});