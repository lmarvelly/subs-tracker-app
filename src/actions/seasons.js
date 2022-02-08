import uuid from 'uuid';

export const addSeason = ({ seasonName = '', seasonUuid = '' }) =>(
{
	type: 'ADD_SEASON',
	season:
	{
		seasonName,
		seasonUuid: uuid()
	}
})