import { textSearch } from "../functions/generalFilterFunctions";

export default ( seasons, { text = '', sortBy } ) =>
{
	return seasons.filter( ( season ) => 
	{
		const searchFilterTextArray = text.split(' ');
		const seasonNameArray = season.seasonName.split(' ');

		return textSearch( searchFilterTextArray, seasonNameArray );
	}).sort( (a, b) =>
	{
		if( sortBy === 'ascending' )
		{
			const nameA = a.seasonName.toLowerCase();
			const nameB = b.seasonName.toLowerCase();

			if ( nameA < nameB ) return -1;
			if ( nameA > nameB ) return 1;
			return 0;
		};
		if( sortBy === 'descending' )
		{
			const nameA = a.seasonName.toLowerCase();
			const nameB = b.seasonName.toLowerCase();

			if ( nameA > nameB ) return -1;
			if ( nameA < nameB ) return 1;
			return 0;
		};
	});
}