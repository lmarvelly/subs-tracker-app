import React from 'react';

const MemberSeasonSummaryListItem = (
{
	seasonName = '',
	seasonSessionTotals = []
}) =>
{
	console.log(seasonSessionTotals);
	return (
		<div>
			<h2>{`Season: ${seasonName}`}</h2>
			{
				seasonSessionTotals.length === 0 ?
				<h3>No Records</h3>
				:
				seasonSessionTotals.map(session =>
				{
					return <h3>{session.sessionName}: {session.count}</h3>
				})
			}
		</div>
	);
};

export default MemberSeasonSummaryListItem;