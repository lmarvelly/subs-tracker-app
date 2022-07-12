import React, { useEffect, useState  } from 'react';

const SessionTypeForm = ( props ) =>
{
	const [ sessionTypeName, setSessionTypeName ] = useState('');

	const onSubmit = (e) =>
	{
		e.preventDefault();
		const sessionName = sessionTypeName;

		props.onSubmit({sessionName});
	}

	const onSessionNameChange = (e) =>
	{
		setSessionTypeName(e.target.value);
	}

	return (
		<div>
			<form className='form' onSubmit={ onSubmit }>
				<input 
					className="text-input"
					onChange={onSessionNameChange}
					placeholder='Add new session type'
					value={sessionTypeName}
				/>
				<button className='button'>Add Session Type</button>
			</form>
		</div>
	)
}

export default SessionTypeForm;