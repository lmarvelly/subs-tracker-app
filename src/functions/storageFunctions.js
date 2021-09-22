const getSavedMembers = () =>
{
	const membersListJSON = localStorage.getItem( 'mockMembers' );

	return membersListJSON ? JSON.parse( membersListJSON ) : [];
}

const getSavedSubs = () =>
{
	const subsListJSON = localStorage.getItem( 'mockSubs' );

	return subsListJSON ? JSON.parse( subsListJSON ) : [];
}

export { getSavedMembers, getSavedSubs }