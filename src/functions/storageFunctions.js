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

const saveMembers = ( membersList ) =>
{
	const sortedMemberList = sortMemberList( membersList );
	localStorage.setItem( 'membersList', JSON.stringify( sortedMemberList ));
}

export { getSavedMembers, getSavedSubs, saveMembers }