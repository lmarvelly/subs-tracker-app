import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

/**
 * @class Link make use of client side routing so we don't have
 * fully page reloads.
 * 
 * @param startLogout is got from Dispatch Props
 */
 export const Header = ({ startLogout }) => (
	<header className='header'>
		<Link 
			className='header__title' 
			to='/dashboard' 
			activeClassName='is-active'
		>
			<h1>Subs Tracker</h1>
		</Link>
		<Link to='/add-record' activeClassName='is-active'>Add Record </Link>
		<Link to='/add-member' activeClassName='is-active'>Add Member </Link>
		<Link to='/add-season' activeClassName='is-active'>Add Season </Link>
		<Link to='/members' activeClassName='is-active'>Members Page </Link>
		<Link to='/seasons' activeClassName='is-active'>Seasons Page </Link>
		<Link to='/help' activeClassName='is-active'>Help Page </Link>
		<button onClick={startLogout}>Logout</button>
	</header>
);

// Return an object
const mapDispatchToProps = (dispatch) => (
{
	startLogout: () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);