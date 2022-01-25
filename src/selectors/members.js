export default ( members, { text, sortBy } ) =>
{
	return members.filter( ( member )=>
	{
		const firstNameMatch = member.firstName.toLowerCase().includes(text.toLowerCase()); // ADD CODE FOR TEXT MATCH
		const middleNames = member.middleNames.toLowerCase().includes(text.toLowerCase()); // ADD CODE FOR TEXT MATCH
		const surname = member.surname.toLowerCase().includes(text.toLowerCase()); // ADD CODE FOR TEXT MATCH
		const nickName = member.nickName.toLowerCase().includes(text.toLowerCase()); // ADD CODE FOR TEXT MATCH
		
		return firstNameMatch || middleNames || surname || nickName;
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