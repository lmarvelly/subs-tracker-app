import React from 'react';

const SessionTypeListItem = ( props ) =>
{
	const handleRemove = () =>
	{
		if(confirm(`Are you sure you want to remove '${props.sessionName}'`))
		{
			props.removeSessionType( props.sessionUuid );
		}
	}

	return(
		<div className='list-item'>
			<div className='list-item__row'>
				<h3 className={`list-item__title`}>
					{props.sessionName}
				</h3>
				<button onClick={handleRemove} className='button'>remove</button>
			</div>
		</div>
	);
}

export default SessionTypeListItem;