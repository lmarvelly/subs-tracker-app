import React from 'react';
import { Link } from 'react-router-dom';

const MemberItem = ( props) =>
{
	
	return (
		<div className='list-item'>
			<div className='list-item__row'>
				<div className='list-item__column'>
					<span>
						Full Name: <span className='bold-font'>{`${props.firstName} ${props.middleNames} ${props.surname}`}</span>
					</span>
					<span>
						Nick Name: <span className='bold-font'>{props.nickname}</span>
					</span>
				</div>

				<Link
					className='button list-item__align-left' 
					to={`/edit-member/${props.playerUuid}`}
				>
					Edit Member
				</Link>
			</div>
		</div>
	);
}

export default MemberItem;