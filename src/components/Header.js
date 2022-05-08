import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

import Navbar from './Navbar';

/**
 * @class Link make use of client side routing so we don't have
 * fully page reloads.
 * 
 * @param startLogout is got from Dispatch Props
 */
 export const Header = ({ startLogout }) => (
	<header className='header'>
		<div className='content-container'>
			<div className='header__content'>
				<Link 
					className='header__title' 
					to='/dashboard' 
					activeClassName='is-active'
				>
					<h1>Subs Tracker</h1>
				</Link>
				<button className='button button--logout' onClick={startLogout}>Logout</button>
			</div>

			<Navbar />
		</div>
	</header>
);

// Return an object
const mapDispatchToProps = (dispatch) => (
{
	startLogout: () => dispatch(startLogout())
});

export default connect(undefined,mapDispatchToProps)(Header);