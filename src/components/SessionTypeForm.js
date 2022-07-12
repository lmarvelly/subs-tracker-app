import React, { useEffect, useState  } from 'react';

const SessionTypeForm = () =>
{
	const [ sessionTypeName, setSessionTypeName ] = useState('');

	const onSubmit = (e) =>
	{
		e.preventDefault();
		console.log('onSubmit');
	}

	return (
		<div>
			<form className='form' onSubmit={ onSubmit }>
				<input className="text-input" placeholder='Add new session type'/>
				<button className='button'>Add Session Type</button>
			</form>
		</div>
	)
}

export default SessionTypeForm;