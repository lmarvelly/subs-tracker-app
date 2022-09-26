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
		playerUuidFilter,
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

		let member;
		// Filter by Member
		if(record.recordType === 'DEBT' || record.recordType === 'PAYMENT')
		{
			member = members.find( ( member ) => 
				record.playerUuid === member.playerUuid
			);
		}
		else
		{
			record.playerList.forEach((record) =>
			{
				member = members.find( ( member ) => 
					record.playerUuid === member.playerUuid
				);
			});
		}

		const memberTextFilterArray = memberTextFilter.split(' ');
		const middleNames = member.middleNames.split(' ');
		const nickname = member.nickname.split(' ');
		const searchMemberTextArray = [ member.firstName, member.surname ].concat(middleNames, nickname);

		const isMemberTextMatch = textSearch( memberTextFilterArray, searchMemberTextArray );
		const memberUuidMatch = playerUuidFilter ? playerUuidFilter === record.playerUuid : true;

		// Filter by Session Name
		const sessionTextFilterArray = sessionNameTextFilter.split(' ');
		const searchSeshTextArray = record.sessionName.split(' ');
		const isSeshNameMatch = textSearch( sessionTextFilterArray, searchSeshTextArray );

		const createdAtMoment = moment( record.createdAt );
		const startDateMatch = startDate ? startDate.isSameOrBefore( createdAtMoment, 'day' ) : true; // if the record is created the same day or before the startDate it gets filtered out
		const endDateMatch  = endDate ? endDate.isSameOrAfter( createdAtMoment, 'day' ) : true ; // if the record is created the same day or after the endDate then it's filtered out

		const seasonMatch = seasonFilter ? seasonFilter === record.seasonUuid : true;
		
		return filterByRecordType && isMemberTextMatch && memberUuidMatch && startDateMatch && endDateMatch && isSeshNameMatch && seasonMatch; // Return true only if all the above are true. Record is removed if false
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