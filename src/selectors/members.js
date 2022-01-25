export default ( members, { text, sortBy } ) =>
{
	console.log('SortBy: ', sortBy);
	return members.filter( ( member )=>
	{
		const textMatch = ''; // ADD CODE FOR TEXT MATCH
		return true;
	}).sort( (a, b) =>
	{
		if( sortBy === 'alphabetAsc' )
		{
			console.log('Sorting');
			const nameA = a.firstName.toLowerCase();
			const nameB = b.firstName.toLowerCase();

			console.log(`${nameA} > ${nameB} ${nameA > nameB}`);

			if ( nameA < nameB ) return -1;
			if ( nameA > nameB ) return 1;
			return 0;
		}
	})
}