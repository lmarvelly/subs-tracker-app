export default ( members, { text, sortBy } ) =>
{
	return members.filter( ( member )=>
	{
		const textMatch = ''; // ADD CODE FOR TEXT MATCH
		return true;
	}).sort( (a, b) =>
	{
		if( sortBy === 'alphabetAsc' )
		{
			const nameA = a.firstName.toLowerCase();
			const nameB = b.firstName.toLowerCase();

			if ( nameA < nameB ) return -1;
			if ( nameA > nameB ) return 1;
			return 0;
		}
	})
}