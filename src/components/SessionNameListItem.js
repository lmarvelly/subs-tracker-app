import React, { useEffect, useState } from 'react';

const SessionNameListItem = ( props ) =>
{
	const [ expand, setExpand ] = useState(false);

	const handleExpand = () =>
	{
		setExpand(!expand);
	}

	const handleRemove = () =>
	{
		if(confirm(`Are you sure you want to remove '${props.sessionName}'`))
		{
			props.handleRemove( props.sessionUuid );
		}
	}

	const handleEdit = () =>
	{
		const sessionName = prompt('Edit Session Name', props.sessionName);

		const updates = {sessionName};

		if (sessionName) 
		{
			props.handleEdit( props.sessionUuid, updates );
		}
	}

	return(
		<div className='list-item' onClick={handleExpand}>
			<div className='list-item__row'>
				<h3 className={`list-item__title`}>
					{props.sessionName}
				</h3>
				{
					expand &&
					<div className='list-item__button-container'>
						<button onClick={handleEdit} className='button-small--form'>Edit</button>
						<button onClick={handleRemove} className='button-small--form'>Remove</button>
					</div>
				}
			</div>
		</div>
	);
}

export default SessionNameListItem;