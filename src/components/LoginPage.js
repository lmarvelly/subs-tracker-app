import React, { useState } from 'react';
import { connect } from 'react-redux';

import { startGoogleLogin, startCreateUserWithEmail } from '../actions/auth';
import EmailLoginForm from './EmailLoginForm';

export const LoginPage = ({ startGoogleLogin }) => 
{
	const [ displayLoginButtons, setDisplayLoginButtons ] = useState(true);
	const [ displayEmailLogin, setDisplayEmailLogin ] = useState(false);

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
		console.log(email);
		console.log('Password:', password);

		startCreateUserWithEmail( email, password );
	}

	return (
		<div className='box-layout'>
			<div className='box-layout__box'>
				<h1 className='box-layout__title'>Subs Tracker App</h1>
				{ displayLoginButtons && signInButtons }
				{ displayEmailLogin && <EmailLoginForm createUserWithEmail={createUserWithEmail} /> }
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => ({
	startGoogleLogin: () => dispatch(startGoogleLogin())
});

export default connect( undefined, mapDispatchToProps )(LoginPage);