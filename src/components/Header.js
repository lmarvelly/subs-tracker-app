import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

/**
 * @class NavLink make use of client side routing so we don't have
 * fully page reloads.
 * 
 * @param startLogout is got from Dispatch Props
 */
 export const Header = ({ startLogout }) => (
	<header>
		<h1>Subs Tracker</h1>
		<NavLink to='/dashboard' activeClassName='is-active'>Home </NavLink>
		<NavLink to='/add-record' activeClassName='is-active'>Add Record </NavLink>
		<NavLink to='/add-member' activeClassName='is-active'>Add Member </NavLink>
		<NavLink to='/add-season' activeClassName='is-active'>Add Season </NavLink>
		<NavLink to='/members' activeClassName='is-active'>Members Page </NavLink>
		<NavLink to='/seasons' activeClassName='is-active'>Seasons Page </NavLink>
		<NavLink to='/help' activeClassName='is-active'>Help Page </NavLink>
		<button onClick={startLogout}>Logout</button>
	</header>
);

// Return an object
const mapDispatchToProps = (dispatch) => (
{
	startLogout: () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);