import React from 'react';

const SessionTypeListItem = ( props ) =>
{
	return(
		<div className='list-item'>
			<div className='list-item__row'>
				<h3 className={`list-item__title`}>
					{props.sessionName}
				</h3>
				
			</div>
		</div>
	);
}

export default SessionTypeListItem;