import { textSearch } from "../functions/generalFilterFunctions";

export default ( seasons, { text = '', sortBy = 'descending' } ) =>
{
	return seasons.filter( ( season ) => 
	{
		const searchFilterTextArray = text.split(' ');
		const seasonNameArray = season.seasonName ? season.seasonName.split(' ') : [''];

		return textSearch( searchFilterTextArray, seasonNameArray );
	}).sort( (playerA, playerB) =>
	{
		if( sortBy === 'ascending' )
		{
			const nameA = playerA.seasonName.toLowerCase();
			const nameB = playerB.seasonName.toLowerCase();

			if ( nameA < nameB ) return -1;
			if ( nameA > nameB ) return 1;
			return 0;
		};
		if( sortBy === 'descending' )
		{
			const nameA = playerA.seasonName.toLowerCase();
			const nameB = playerB.seasonName.toLowerCase();

			if ( nameA > nameB ) return -1;
			if ( nameA < nameB ) return 1;
			return 0;
		};
	});
}