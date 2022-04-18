import moment from "moment";

/**
 * Destruct Filters
 * {
 * 	descriptionTextFilter
 * 	memberTextFilter
 * 	sortBy
 * 	startDate
 * 	endDate
 * 	seasonFilter
 * }
 * 
 * @param {*} records 
 * @param {*} filters
 */
export default ( records = {}, members = {}, { descriptionTextFilter, memberTextFilter, sortBy = 'dateAscending', startDate, endDate, seasonFilter } ) =>
{
	// memberName.toLowerCase().includes(memberTextFilter.toLowerCase());
	

	return records.filter( (record) =>
	{
		const member = members.find( ( member ) => 
			record.playerUuid === member.playerUuid
		);

		// MemberSearch
		const search = ( filterTextArray = [], searchTextArray = [] ) =>
		{
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

		const isNotBlank = ( text ) => 
		{
			return (text !== '')
		}

		const memberTextFilterArray = memberTextFilter.split(' ').filter(isNotBlank);

		const middleNames = member.middleNames.split(' ');
		const nickname = member.nickname.split(' ');
		let searchTextArray = [ member.firstName, member.surname ];
		searchTextArray = searchTextArray.concat(middleNames, nickname);
		
		// Filter out blank text of search text and member text
		searchTextArray = searchTextArray.filter(isNotBlank);
	
		const isMatch = search( memberTextFilterArray, searchTextArray );

		const createdAtMoment = moment( record.createdAt );
		const startDateMatch = startDate ? startDate.isSameOrBefore( createdAtMoment, 'day' ) : true; // if the record is created the same day or before the startDate it gets filtered out
		const endDateMatch  = endDate ? endDate.isSameOrAfter( createdAtMoment, 'day' ) : true ; // if the record is created the same day or after the endDate then it's filtered out
		const textMatch = record.description.toLowerCase().includes(descriptionTextFilter.toLowerCase());
		
		const seasonMatch = seasonFilter ? seasonFilter === record.seasonUuid : true;
		
		return isMatch && startDateMatch && endDateMatch && textMatch && seasonMatch; // Return true only if all the above are true. Record is removed if false
	}).sort( (a, b) => 
	{
		if( sortBy === 'dateAscending' ) 
		{
			return a.createdAt < b.createdAt ? 1 : -1; // 1 if true, -1 if false
		}
		else if( sortBy === 'dateDescending' ) 
		{
			return a.createdAt > b.createdAt ? 1 : -1; // 1 if true, -1 if false
		}
	});
}