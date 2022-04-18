export const textSearch = ( filterTextArray = [], searchTextArray = [] ) =>
{
	const isNotBlank = ( text ) => 
	{
		return (text !== '')
	}

	// Filter out blank text array elements
	filterTextArray = filterTextArray.filter(isNotBlank);
	searchTextArray = searchTextArray.filter(isNotBlank);

	let result = 0;
	filterTextArray.forEach(filterText => 
	{
		searchTextArray.forEach(searchText => 
		{
			if(searchText.toLowerCase().includes(filterText.toLowerCase()))
			{
				result += 1;
			}
		});
	});

	return result >= filterTextArray.length;
}