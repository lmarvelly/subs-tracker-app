import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';

/**
 * @param component The component that is passed in is renamed
 * with a capital C because it's going to be Rendered.
 * @param rest This is the rest of the properties that were not 
 * destructured. This could be called anything.
 * 
 * @returns Either returns a Route component with 
 */
export const PrivateRoute = (
{ 
	isAuthenticated, 
	component: Component,
	...rest 
}) => (
	<Route { ...rest } component={(props) => (
		isAuthenticated ? (
			<div>
				<Header />
				<Component {...props}/>
			</div>
		) : (
			<Redirect to="/"/>
		)
	)}/>
);

const mapStateToProps = ( state ) =>(
{
	isAuthenticated: !!state.auth.uid // Double flip to boolean values
});

export default connect( mapStateToProps )( PrivateRoute )