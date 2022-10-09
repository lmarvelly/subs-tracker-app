import moment from "moment";

import { textSearch } from "../functions/generalFilterFunctions";

const filterByMemberText = ( memberArray, filterArray ) =>
{
	let isMatch = false;
	memberArray.forEach( member => 
	{
		const middleNames = member.middleNames.split(' ');
		const nickname = member.nickname.split(' ');
		const searchMemberTextArray = [ member.firstName, member.surname ].concat(middleNames, nickname);
		const isMemberTextMatch = textSearch( filterArray, searchMemberTextArray );

		if(isMemberTextMatch)
		{
			isMatch = true;
		}
	});

	return isMatch;
};

const filterByMemberID = ( id, memberArray) =>
{
	let isMatch = false;
	memberArray.forEach(member =>
	{
		if(member.playerUuid === id)
		{
			isMatch = true;
		}
	});

	return isMatch;
};

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
		/////////////////////////////////
		///// Filter by Record Type /////
		/////////////////////////////////
		const recordType = record.recordType;
		const filterByRecordType = recordTypeFilter === 'ALL' ? true : recordType === recordTypeFilter;

		/////////////////////////////////
		///// Filter by Member Text /////
		/////////////////////////////////
		const memberArray = [];
		if(record.recordType === 'DEBT' || record.recordType === 'PAYMENT')
		{
			const member = members.find( ( member ) => 
				record.playerUuid === member.playerUuid
			);
			memberArray.push(member);
		}
		else
		{
			record.playerList.forEach((record) =>
			{
				const member = members.find( ( member ) => 
					record.playerUuid === member.playerUuid
				);
				memberArray.push(member);
			});
		}
		const memberTextFilterArray = memberTextFilter.split(' ');
		const isMemberTextMatch = filterByMemberText(memberArray, memberTextFilterArray)
		
		///////////////////////////////
		///// Filter by Member ID /////
		///////////////////////////////
		const memberUuidMatch = playerUuidFilter ? filterByMemberID( playerUuidFilter, memberArray ) : true;

		//////////////////////////////////
		///// Filter by Session Name /////
		//////////////////////////////////
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