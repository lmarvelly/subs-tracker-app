import React from 'react';

const SessionNameListItem = ( props ) =>
{
	const handleRemove = () =>
	{
		if(confirm(`Are you sure you want to remove '${props.sessionName}'`))
		{
			props.removeSessionName( props.sessionUuid );
		}
	}

	const handleEdit = () =>
	{
		const sessionName = prompt('Edit Session Name', props.sessionName);

		const updates = {sessionName};

		if (sessionName) 
		{
			props.editSessionName( props.sessionUuid, updates );
		}
	}

	return(
		<div className='list-item'>
			<div className='list-item__row'>
				<h3 className={`list-item__title`}>
					{props.sessionName}
				</h3>
				<button onClick={handleEdit} className='button'>Edit</button>
				<button onClick={handleRemove} className='button'>Remove</button>
			</div>
		</div>
	);
}

export default SessionNameListItem;