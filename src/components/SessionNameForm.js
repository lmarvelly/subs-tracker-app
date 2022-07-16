import React, { useEffect, useState  } from 'react';

const SessionNameForm = ( props ) =>
{
	const [ formError, setFormError ] = useState(undefined);
	const [ sessionName, setSessionName ] = useState('');

	const onSubmit = (e) =>
	{
		e.preventDefault();

		let exists = false;
		
		props.sessionNames.forEach((session) =>
		{
			if (session.sessionName === sessionName) 
			{
				setFormError('Session Name Already exists');
				exists = true;
			}
		});

		// If the name doesn't already exist
		if(!exists)
		{
			props.onSubmit(sessionName);
			setSessionName('');
			setFormError(undefined);
		}
	}

	const onSessionNameChange = (e) =>
	{
		setSessionName(e.target.value);
	}

	return (
		<div>
			<form className='form' onSubmit={ onSubmit }>
				{ formError && <p className='form__error'>{formError}</p> }
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