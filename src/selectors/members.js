import { textSearch } from "../functions/generalFilterFunctions";

export default ( members, { text = '', sortBy } ) =>
{
	return members.filter( ( member )=>
	{
		const searchFilterTextArray = text.split(' ');

		const { firstName, middleNames, surname, nickname } = member;
		let memberNameArray = [ firstName, surname ];
		memberNameArray = memberNameArray.concat(middleNames.split(' '), nickname.split(' '));
		console.log("searchFilterTextArray: ", searchFilterTextArray, 'memberNameArray:', memberNameArray);
		
		return textSearch(searchFilterTextArray, memberNameArray)
	}).sort( (a, b) =>
	{
		if( sortBy === 'alphabetAsc' )
		{
			const nameA = a.firstName.toLowerCase();
			const nameB = b.firstName.toLowerCase();

			if ( nameA < nameB ) return -1;
			if ( nameA > nameB ) return 1;
			return 0;
		}
		if( sortBy === 'alphabetDesc' )
		{
			const nameA = a.firstName.toLowerCase();
			const nameB = b.firstName.toLowerCase();

			if ( nameA > nameB ) return -1;
			if ( nameA < nameB ) return 1;
			return 0;
		}
	})
}