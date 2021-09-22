import { sortMemberList } from './sortFunctions';

const getSavedMembers = () =>
{
	const membersListJSON = localStorage.getItem( 'membersList' );

	return membersListJSON ? JSON.parse( membersListJSON ) : [];
}

const getSavedSubs = () =>
{
	const subsListJSON = localStorage.getItem( 'subsList' );

	return subsListJSON ? JSON.parse( subsListJSON ) : [];
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

const saveMembers = ( membersList ) =>
{
	const sortedMemberList = sortMemberList( membersList );
	localStorage.setItem( 'membersList', JSON.stringify( sortedMemberList ));
}

export { getSavedMembers, getSavedSubs, removeMember, saveMembers }