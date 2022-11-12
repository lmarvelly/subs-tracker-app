import React from 'react';

const MemberSeasonAttendenceListItem = (
{
	seasonName = '',
	seasonSessionTotals = []
}) =>
{
	return (
		<div>
			<div className='list-item'>
				<div className='list-item__title--bold'>Season: {seasonName}</div>
				<div className='list-itme__row-padding'>
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
		</div>
	);
};

export default MemberSeasonAttendenceListItem;