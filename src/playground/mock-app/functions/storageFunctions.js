import { sortMemberList } from './sortFunctions';

const getName = ( memberId ) =>
{	
	const membersList = getSavedMembers();

	const name = membersList.map( member =>
	{
		if ( memberId === member.uuid ) 
		{
			console.log(member.name);
			return member.name;
		}
	});

	return name;
}

const getSavedMembers = () =>
{
	const membersListJSON = localStorage.getItem( 'membersList' );

	return membersListJSON ? JSON.parse( membersListJSON ) : [];
}

const getSavedSubs = ( seasonName ) =>
{
	const subsListJSON = localStorage.getItem( 'seasonList' );
	const seasonsList = JSON.parse( subsListJSON );

	if (seasonsList) 
	{
		return seasonsList.seasons[ seasonName ];
	}
	else return [];
}

// REMOVE MEMBER
const removeMember = ( memberID, membersList ) =>
{
	const memberIndex = membersList.findIndex( ( member ) =>
	{
		return memberID === member.uuid;
	});

	membersList.splice( memberIndex, 1 );
	saveMembers( membersList );
	
	return membersList;
}


const editMember = ( editedMember, membersList ) =>
{
	const memberIndex = membersList.findIndex( member =>
	{
		return editedMember.uuid === member.uuid
	});
	
	membersList[memberIndex] = editedMember;
	
	const sortedMemberList = sortMemberList( membersList );

	localStorage.setItem( 'membersList', JSON.stringify( sortedMemberList ));
}

const saveMembers = ( membersList ) =>
{
	const sortedMemberList = sortMemberList( membersList );
	localStorage.setItem( 'membersList', JSON.stringify( sortedMemberList ));
}

export { getName, getSavedMembers, getSavedSubs, editMember, removeMember, saveMembers }