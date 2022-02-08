export default ( seasons, { text = '', sortBy } ) =>
{
	return seasons.filter( ( season ) => 
	{
		const seasonNameMatch = season.seasonName.toLowerCase().includes( text.toLowerCase() );

		return seasonNameMatch;
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