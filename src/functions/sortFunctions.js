// Sort Member list by name
const sortMemberList = ( members ) =>
{
	members.sort(( a, b ) =>
	{
		let nameA = a.name.toLowerCase();
		let nameB = b.name.toLowerCase();

		if ( nameA < nameB ) return -1;
		if ( nameA > nameB ) return 1;
		return 0;
	});

	return members;
}

export { sortMemberList };