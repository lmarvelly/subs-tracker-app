import moment from "moment";

import { textSearch } from "../functions/generalFilterFunctions";

const filterByMemberText = ( memberArray, filterArray ) =>
{
	let isMatch = false;
	memberArray.forEach( member => 
	{
		const currentMember = member ? member : { firstName: '', middleNames: '', nickname: '', surname: '' }
		const middleNames = currentMember.middleNames.split(' ');
		const nickname = currentMember.nickname.split(' ');
		const searchMemberTextArray = [ currentMember.firstName, currentMember.surname ].concat(middleNames, nickname);
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
		const currentMember = member ? member : { playerUuid: '' }
		if(currentMember.playerUuid === id)
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
		const {  
			playerUuid = '',
			seasonUuid = '',
			id = '',
			recordType = '',
			sessionName = '',
			note = '',
			playerList = [],
			createdAt = 0, // 01-01-1970
			amount = 0
		} = record;

		/////////////////////////////////
		///// Filter by Record Type /////
		/////////////////////////////////
		const filterByRecordType = recordTypeFilter === 'ALL' ? true : recordType === recordTypeFilter;

		/////////////////////////////////
		///// Filter by Member Text /////
		/////////////////////////////////
		const memberArray = [];
		if(recordType === 'DEBT' || recordType === 'PAYMENT')
		{
			const member = members.find( ( member ) => 
				playerUuid === member.playerUuid
			);
			memberArray.push(member);
		}
		else if (recordType === 'SESSION')
		{
			playerList.forEach((record) =>
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
		const searchSeshTextArray = record.sessionName ? record.sessionName.split(' ') : [];
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