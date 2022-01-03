/**
 * HOC - HIGHER ORDER COMPONENT
 * 
 * A component that renders another component
 * 
 * It's goal is to REUSE CODE. 
 * 
 * The example here shows how we can render admin data without 
 * writting a completely new component to do so
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
	<div>
		<h1>Info</h1>
		<p>The info is: {props.info}</p>
	</div>
);

/**
 * @param {object} props 
 * @param {*} wrappedComponent 
 * @returns A higher order component (HOC)
 */
const withAdminWarning = ( WrappedComponent ) => 
{
	return ( props ) => (
		<div>
			{ props.isAdmin && <p>This is Private Info. DO NOT SHARE!!!</p> }
			<WrappedComponent {...props} />
		</div>
	);
};


const requireAuthentication = ( WrappedComponent ) =>
{
	const notAuthMessage  = <p>You don't have permission. Please Login</p>;

	return ( props ) => (
		<div>
		{ 
			props.isAuthenticated 
			?
			<WrappedComponent {...props} />
			:
			notAuthMessage
		}
		</div>
	);
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="These are the details" />, document.getElementById('app'));