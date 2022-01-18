import React from 'react';
import { Link } from 'react-router-dom';

const MemberItem = ({ fullName, nickName, playerUuid }) =>
{
	return (
		<div>
			<span>Full Name:<b>{fullName}</b></span>
			<br />
			<span>Nick Name:<b>{nickName}</b></span>
			<br />
			<a>Insert Edit/Delete Link Here</a>
			<br />
			<br />
		</div>
	);
}

export default MemberItem;