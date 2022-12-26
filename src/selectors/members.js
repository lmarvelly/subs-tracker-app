import { textSearch } from "../functions/generalFilterFunctions";

export default ( members = [], { text = '', sortBy = 'alphabetAsc' } ) =>
{
	return members.filter( ( member )=>
	{
		const searchFilterTextArray = text.split(' ');

		const { firstName = '', middleNames = '', surname = '', nickname = '' } = member;
		let memberNameArray = [ firstName, surname ];
		memberNameArray = memberNameArray.concat(middleNames.split(' '), nickname.split(' '));
		
		return textSearch(searchFilterTextArray, memberNameArray)
	}).sort( (playerA, playerB) =>
	{
		if( sortBy === 'alphabetAsc' )
		{
			const nameA = playerA.firstName ? playerA.firstName.toLowerCase() : '';
			const nameB = playerB.firstName ? playerB.firstName.toLowerCase() : '';

			if ( nameA < nameB ) return -1;
			if ( nameA > nameB ) return 1;
			return 0;
		}
		if( sortBy === 'alphabetDesc' )
		{
			const nameA = playerA.firstName ? playerA.firstName.toLowerCase() : '';
			const nameB = playerB.firstName ? playerB.firstName.toLowerCase() : '';

			if ( nameA > nameB ) return -1;
			if ( nameA < nameB ) return 1;
			return 0;
		}
	})
}