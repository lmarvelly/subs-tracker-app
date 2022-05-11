import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const LoginPage = ({ startLogin }) => (
	<div className='box-layout'>
		<div className='box-layout__box'>
			<h1 className='box-layout__title'>Subs Tracker App</h1>
			<p>It's time to get your teams subs under control.</p>
			<button 
				onClick={startLogin}
				className='button--google'
			>
				Login with Google
			</button>
			<button
				className='button'
			>
				Login with Email
			</button>
		</div>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
});

export default connect( undefined, mapDispatchToProps )(LoginPage);