import moment from "moment";

import { textSearch } from "../functions/generalFilterFunctions";

/**
 * Destruct Filters
 * {
 * 	sessionNameTextFilter
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
export default ( 
	records = {}, 
	members = {}, 
	{ 
		sessionNameTextFilter,
		memberTextFilter,
		sortBy = 'dateAscending',
		startDate,
		endDate,
		recordTypeFilter = 'ALL',
		seasonFilter
	}) =>
{
	return records.filter( (record) =>
	{
		const filterByRecordType = recordTypeFilter === 'ALL' ? true : record.recordType === recordTypeFilter

		// Filter by Member
		const member = members.find( ( member ) => 
			record.playerUuid === member.playerUuid
		);
		const memberTextFilterArray = memberTextFilter.split(' ');
		const middleNames = member.middleNames.split(' ');
		const nickname = member.nickname.split(' ');
		const searchMemberTextArray = [ member.firstName, member.surname ].concat(middleNames, nickname);
		const isMemberMatch = textSearch( memberTextFilterArray, searchMemberTextArray );

		// Filter by Session Name
		const descTextFilterArray = sessionNameTextFilter.split(' ');
		const searchDescTextArray = record.sessionName.split(' ');
		const isDescMatch = textSearch( descTextFilterArray, searchDescTextArray );

		const createdAtMoment = moment( record.createdAt );
		const startDateMatch = startDate ? startDate.isSameOrBefore( createdAtMoment, 'day' ) : true; // if the record is created the same day or before the startDate it gets filtered out
		const endDateMatch  = endDate ? endDate.isSameOrAfter( createdAtMoment, 'day' ) : true ; // if the record is created the same day or after the endDate then it's filtered out
		
		const seasonMatch = seasonFilter ? seasonFilter === record.seasonUuid : true;
		
		return filterByRecordType && isMemberMatch && startDateMatch && endDateMatch && isDescMatch && seasonMatch; // Return true only if all the above are true. Record is removed if false
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