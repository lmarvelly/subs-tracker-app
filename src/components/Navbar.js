import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

// Export named export for testing
export class Navbar extends Component
{
	constructor( props )
	{
		super( props )
		{
			this.state =
			{
				hidden: true
			}
		}
	}

	navButtons = () =>
	{
		return (
			<div>
				<Link className='button button--nav' to='/members' activeClassName='is-active'>Members Page </Link>
				<Link className='button button--nav' to='/seasons' activeClassName='is-active'>Seasons Page </Link>
				<Link className='button button--nav' to='/help' activeClassName='is-active'>Help Page </Link>
			</div>
		)
	}

	isShowing = () =>
	{
		this.setState({hidden: !this.state.hidden});
	}

	render()
	{
		const navButtons = (
			<div className='header__content header__nav'>
				<Link className='button button--nav' to='/members' activeClassName='is-active'>Members Page </Link>
				<Link className='button button--nav' to='/seasons' activeClassName='is-active'>Seasons Page </Link>
				<Link className='button button--nav' to='/help' activeClassName='is-active'>Help Page </Link>
			</div>
		);

		return(
			<div className='header__content header__nav'>
				<button onClick={this.isShowing} className='hamburger'>☰</button>
				{
					!this.state.hidden && navButtons
				}
			</div>
		)
	}
}

export default Navbar;