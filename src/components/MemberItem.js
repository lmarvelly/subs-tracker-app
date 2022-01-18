import React from 'react';
import { Link } from 'react-router-dom';

const MemberItem = ( props) =>
{
	
	return (
		<div>
			<span>
				Full Name:
				<Link to={`/edit-member/${props.playerUuid}`}>
					<b>{props.fullName}</b>
				</Link>
			</span>
			<br />
			<span>
				Nick Name:
				<Link to={`/edit-member/${props.playerUuid}`}>
					<b>{props.nickName}</b>
				</Link>
			</span>
			<br />
			<br />
		</div>
	);
}

export default MemberItem;