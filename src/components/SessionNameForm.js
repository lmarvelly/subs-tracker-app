import React, { useEffect, useState  } from 'react';

const SessionNameForm = ( props ) =>
{
	const [ sessionName, setSessionName ] = useState('');

	const onSubmit = (e) =>
	{
		e.preventDefault();

		props.onSubmit(sessionName);
		setSessionName('');
	}

	const onSessionNameChange = (e) =>
	{
		setSessionName(e.target.value);
	}

	return (
		<div>
			<form className='form' onSubmit={ onSubmit }>
				<input 
					className="text-input"
					onChange={onSessionNameChange}
					placeholder='Add new session type'
					value={sessionName}
				/>
				<button className='button'>Add Session Type</button>
			</form>
		</div>
	)
}

export default SessionNameForm;