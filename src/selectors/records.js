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
		const recordType = record.recordType;

		const filterByRecordType = recordTypeFilter === 'ALL' ? true : recordType === recordTypeFilter;

		// Filter by Member
		const member = members.find( ( member ) => 
			record.playerUuid === member.playerUuid
		);
		const memberTextFilterArray = memberTextFilter.split(' ');
		const middleNames = member.middleNames.split(' ');
		const nickname = member.nickname.split(' ');
		const searchMemberTextArray = [ member.firstName, member.surname ].concat(middleNames, nickname);
		// Automatically filters out Sessions
		// TODO: Search inside Sessions playerList for members
		const isMemberMatch = recordType === 'SESSION' ? false : textSearch( memberTextFilterArray, searchMemberTextArray );

		// Filter by Session Name
		const sessionTextFilterArray = sessionNameTextFilter.split(' ');
		const searchSeshTextArray = record.sessionName.split(' ');
		const isSeshNameMatch = textSearch( sessionTextFilterArray, searchSeshTextArray );

		const createdAtMoment = moment( record.createdAt );
		const startDateMatch = startDate ? startDate.isSameOrBefore( createdAtMoment, 'day' ) : true; // if the record is created the same day or before the startDate it gets filtered out
		const endDateMatch  = endDate ? endDate.isSameOrAfter( createdAtMoment, 'day' ) : true ; // if the record is created the same day or after the endDate then it's filtered out
		
		const seasonMatch = seasonFilter ? seasonFilter === record.seasonUuid : true;
		
		return filterByRecordType && isMemberMatch && startDateMatch && endDateMatch && isSeshNameMatch && seasonMatch; // Return true only if all the above are true. Record is removed if false
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