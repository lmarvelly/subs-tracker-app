/**
 * Destruct Filters
 * {
 * 	text
 * 	sortBy
 * 	startDate
 * 	endDate
 * }
 * 
 * @param {*} records 
 * @param {*} filters
 */
export default ( records, { text, sortBy, startDate, endDate } ) =>
{
	return records.filter( (record) =>
	{
		const startDateMatch = typeof startDate !== 'number' || record.createdAt >= startDate; // if the record is created before the startDate it gets filtered out
		const endDateMatch  = typeof endDate !== 'number' || record.createdAt <= endDate; // if the record is created after the endDate then it's filtered out
		const textMatch = record.description.toLowerCase().includes(text.toLowerCase());
		
		return startDateMatch && endDateMatch && textMatch; // Return true only if all the above are true. Record is removed if false
	}).sort( (a, b) => {
		if( sortBy === 'dateAscending' ) {
			return a.createdAt < b.createdAt ? 1 : -1; // 1 if true, -1 if false
		}
		else if( sortBy === 'dateDescending' ) {
			return a.createdAt > b.createdAt ? 1 : -1; // 1 if true, -1 if false
		}
		else if( sortBy === 'amount' ) {
			return a.amount > b.createdAt ? 1 : -1;
		}
	});
}