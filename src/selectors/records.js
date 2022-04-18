import moment from "moment";

import { textSearch } from "../functions/generalFilterFunctions";

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
	return records.filter( (record) =>
	{
		const member = members.find( ( member ) => 
			record.playerUuid === member.playerUuid
		);
		const memberTextFilterArray = memberTextFilter.split(' ');
		const middleNames = member.middleNames.split(' ');
		const nickname = member.nickname.split(' ');
		const searchTextArray = [ member.firstName, member.surname ].concat(middleNames, nickname);
	
		const isMemberMatch = textSearch( memberTextFilterArray, searchTextArray );

		const createdAtMoment = moment( record.createdAt );
		const startDateMatch = startDate ? startDate.isSameOrBefore( createdAtMoment, 'day' ) : true; // if the record is created the same day or before the startDate it gets filtered out
		const endDateMatch  = endDate ? endDate.isSameOrAfter( createdAtMoment, 'day' ) : true ; // if the record is created the same day or after the endDate then it's filtered out
		const isDescMatch = record.description.toLowerCase().includes(descriptionTextFilter.toLowerCase());
		
		const seasonMatch = seasonFilter ? seasonFilter === record.seasonUuid : true;
		
		return isMemberMatch && startDateMatch && endDateMatch && isDescMatch && seasonMatch; // Return true only if all the above are true. Record is removed if false
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