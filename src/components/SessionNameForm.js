import React, { useEffect, useState  } from 'react';

const SessionNameForm = ( props ) =>
{
	const [ formError, setFormError ] = useState(undefined);
	const [ sessionName, setSessionName ] = useState('');

	const onSubmit = (e) =>
	{
		e.preventDefault();

		let exists = false;

		const trimmedName = sessionName.trim()
		
		props.sessionNames.forEach((session) =>
		{
			if (session.sessionName === trimmedName) 
			{
				setFormError('Session Name Already exists');
				exists = true;
			}
		});

		if( trimmedName === '' )
		{
			setFormError('Session Name Cannot be blank');
		}

		// If the name doesn't already exist and name isn't blank
		if( !exists && trimmedName )
		{
			props.onSubmit(trimmedName);
			setSessionName('');
			setFormError(undefined);
		}
	}

	const onSessionNameChange = (e) =>
	{
		if(e.target.value.trim())
		{
			setFormError(undefined);
		}
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