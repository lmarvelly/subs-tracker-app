import React, { useEffect, useState } from 'react';

const OtherSettingsListItem = ( props ) =>
{
	const [ expand, setExpand ] = useState(false);

	console.log(props);

	const handleExpand = () =>
	{
		setExpand(!expand);
	}

	const handleRemove = () =>
	{
		if(confirm(`Are you sure you want to remove '${props.itemName}'`))
		{
			props.handleRemove( props.sessionUuid );
		}
	}

	const handleEdit = () =>
	{
		const itemName = prompt('Edit Session Name', props.itemName);

		// const updates = {itemName};

		if (itemName) 
		{
			props.handleEdit( props.sessionUuid, itemName );
		}
	}

	return(
		<div className='list-item' onClick={handleExpand}>
			<div className='list-item__row'>
				<h3 className={`list-item__title`}>
					{props.itemName}
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

export default OtherSettingsListItem;