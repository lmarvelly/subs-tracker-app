import moment from "moment";

/**
 * Destruct Filters
 * {
 * 	text
 * 	playerUuid
 * 	sortBy
 * 	startDate
 * 	endDate
 * }
 * 
 * @param {*} records 
 * @param {*} filters
 */
export default ( records, members, { text, memberTextFilter, sortBy = 'dateAscending', startDate, endDate, seasonFilter } ) =>
{
	return records.filter( (record) =>
	{
		const member = members.find( ( member ) => 
			record.playerUuid === member.playerUuid
		);
		const memberName = `${member.firstName} ${member.middleNames} ${member.surname} ${member.nickname}`;
		// TODO: Improve searching through names
		const idMatch = memberName.toLowerCase().includes(memberTextFilter.toLowerCase());
		const createdAtMoment = moment( record.createdAt );
		const startDateMatch = startDate ? startDate.isSameOrBefore( createdAtMoment, 'day' ) : true; // if the record is created the same day or before the startDate it gets filtered out
		const endDateMatch  = endDate ? endDate.isSameOrAfter( createdAtMoment, 'day' ) : true ; // if the record is created the same day or after the endDate then it's filtered out
		const textMatch = record.description.toLowerCase().includes(text.toLowerCase());
		
		const seasonMatch = seasonFilter ? seasonFilter === record.seasonUuid : true;
		
		return idMatch && startDateMatch && endDateMatch && textMatch && seasonMatch; // Return true only if all the above are true. Record is removed if false
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