import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @class NavLink make use of client side routing so we don't have
 * fully page reloads.
 */
 const Header = () => (
	<header>
		<h1>Subs Tracker</h1>
		<NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink>
		<NavLink to='/add' activeClassName='is-active'>Add Record</NavLink>
		<NavLink to='/help' activeClassName='is-active'>Help Page</NavLink>
	</header>
);

export default Header;