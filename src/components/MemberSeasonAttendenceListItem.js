import React from 'react';

const MemberSeasonAttendenceListItem = (
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
				<div className='bold-font'>No Records</div>
				:
				seasonSessionTotals.map(session =>
				{
					return <div className='bold-font'>{session.sessionName}: {session.count}</div>
				})
			}
		</div>
	);
};

export default MemberSeasonAttendenceListItem;