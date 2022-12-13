import React from 'react';

export const MemberAttendence = (
{
	seasonSessionTotals = []
}) =>
{
	return (
		<div>
			<div className='list-item'>
			{
				seasonSessionTotals.length === 0 ?
				<div>No sessions attended</div>
				:
				seasonSessionTotals.map(session =>
				{
					return <div key={session.sessionUuid}>{session.sessionName}: {session.count}</div>
				})
			}
			</div>
		</div>
	);
};

export default MemberAttendence;