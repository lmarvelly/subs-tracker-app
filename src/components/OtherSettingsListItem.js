import React, { useEffect, useState } from 'react';

const OtherSettingsListItem = ( props ) =>
{
	const [ expand, setExpand ] = useState(false);

	const handleExpand = () =>
	{
		setExpand(!expand);
	}

	const handleRemove = () =>
	{
		if(confirm(`Are you sure you want to remove '${props.itemName}'`))
		{
			props.handleRemove( props.itemUuid );
		}
	}

	const handleEdit = () =>
	{
		const itemName = prompt('Edit Session Name', props.itemName);

		if (itemName) 
		{
			props.handleEdit( props.itemUuid, itemName );
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