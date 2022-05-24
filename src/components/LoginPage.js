import React, { useState } from 'react';
import { connect } from 'react-redux';

import { startGoogleLogin, startCreateUserWithEmail, startEmailLogin } from '../actions/auth';
import EmailLoginForm from './EmailLoginForm';

export const LoginPage = ({ startGoogleLogin, startEmailLogin }) => 
{
	const [ displayLoginButtons, setDisplayLoginButtons ] = useState(true);
	const [ displayEmailLogin, setDisplayEmailLogin ] = useState(false);
	const [ error, setError ] = useState('');

	const showEmailForm = () =>
	{
		setDisplayEmailLogin(true);
		setDisplayLoginButtons(false);
	}

	const signInButtons = (
		<div>
			<p>It's time to get your teams subs under control.</p>
			<button 
				onClick={ startGoogleLogin }
				className='button--google'
			>
				Login with Google
			</button>
			<button
				onClick={ showEmailForm }
				className='button'
			>
				Login with Email
			</button>
		</div>
	);

	const createUserWithEmail = ( email, password ) =>
	{
		startCreateUserWithEmail( email, password )
		.then(process =>
		{
			setError( process );
		});
	}

	const emailLogin = ( email, password ) =>
	{
		startEmailLogin( email, password );
	}

	return (
		<div className='box-layout'>
			<div className='box-layout__box'>
				<h1 className='box-layout__title'>Subs Tracker App</h1>
				{ displayLoginButtons && signInButtons }
				{ displayEmailLogin && 
					<EmailLoginForm
						error={error}
						createUserWithEmail={createUserWithEmail} 
						emailLogin={emailLogin} 
					/> 
				}
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	startGoogleLogin: () => dispatch(startGoogleLogin()),
	startEmailLogin: ( email, password ) => dispatch(startEmailLogin( email, password ))
});

export default connect( undefined, mapDispatchToProps )(LoginPage);