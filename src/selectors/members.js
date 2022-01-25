export default ( members, { text, sortBy } ) =>
{
	return members.filter( ( member )=>
	{
		const firstNameMatch = member.firstName.toLowerCase().includes(text.toLowerCase()); // ADD CODE FOR TEXT MATCH
		return firstNameMatch;
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
		if( sortBy === 'alphabetDesc' )
		{
			const nameA = a.firstName.toLowerCase();
			const nameB = b.firstName.toLowerCase();

			if ( nameA > nameB ) return -1;
			if ( nameA < nameB ) return 1;
			return 0;
		}
	})
}