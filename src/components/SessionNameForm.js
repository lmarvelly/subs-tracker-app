import React, { useEffect, useState  } from 'react';

const SessionNameForm = ( props ) =>
{
	const [ sessionName, setSessionName ] = useState('');

	const onSubmit = (e) =>
	{
		e.preventDefault();
		console.log(sessionName); // working

		props.onSubmit(sessionName);
		setSessionName('');
	}

	const onSessionNameChange = (e) =>
	{
		console.log(e.target.value); // working
		setSessionName(e.target.value);
		console.log(sessionName);
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