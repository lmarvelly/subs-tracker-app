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
				navHidden: true,
				recordNavHidden: true,
				memberNavHidden: true,
				seasonNavHidden: true,
				helpNavHidden: true
			}
		}
	}

	onClick = (e) =>
	{
		const classNames = e.target.className;
		if (classNames.includes('hamburger')) 
		{
			this.setState({navHidden: !this.state.navHidden});
		}
		else if (classNames.includes('recordButton'))
		{
			this.setState(
			{ 
				recordNavHidden: !this.state.recordNavHidden,
				memberNavHidden: true,
				seasonNavHidden: true
			});
		}
		else if (classNames.includes('memberButton'))
		{
			this.setState(
			{
				memberNavHidden: !this.state.memberNavHidden,
				recordNavHidden: true,
				seasonNavHidden: true
			});
		}
		else if (classNames.includes('seasonButton'))
		{
			this.setState(
			{ 
				seasonNavHidden: !this.state.seasonNavHidden,
				memberNavHidden: true,
				recordNavHidden: true
			});
		}
	}

	isNavShowing = () =>
	{
		this.setState({navHidden: !this.state.navHidden});
	}

	render()
	{
		const upSymbol = String.fromCharCode(8593);
		const downSymbol = String.fromCharCode(8595);

		const recordButtons = (
			<div>
				<button className={`button--dropdown recordButton`} onClick={this.onClick}>
					<span className='button-spacing recordButton'></span>
					<span className='recordButton align-vertical-center'>
						Records
					</span>
					<span className='button-spacing recordButton button-symbol'>
					{
						this.state.recordNavHidden ? downSymbol : upSymbol
					}
					</span>
				</button>
				{
					!this.state.recordNavHidden && (
						<div className='dropdown-group'>
							<Link className='button--nav' to='/dashboard' activeClassName='is-active'>Record Dashboard</Link>
							<Link className='button--nav' to='/add-record'>Add Record</Link>
						</div>
					)
				}
			</div>
		);

		// TODO: Add dropdown and New Member button
		const memberButtons = (
			<div>
				<button className='button--dropdown memberButton' onClick={this.onClick}>
					<span className='button-spacing memberButton'></span>
					<span className='memberButton align-vertical-center'>
						Members
					</span>
					<span className='button-spacing memberButton button-symbol'>
					{
						this.state.memberNavHidden ? downSymbol : upSymbol
					}
					</span>
				</button>
				{
					!this.state.memberNavHidden && (
						<div className='dropdown-group'>
							<Link className='button--nav' to='/members' activeClassName='is-active'>Members Page </Link>
							<Link className='button--nav' to='/add-member'>Add Member</Link>
						</div>
					)
				}
				
			</div>
		);

		// TODO: Add dropdown and New Season button
		const seasonButtons = (
			<div>
				<button className='button--dropdown seasonButton' onClick={this.onClick}>
					<span className='button-spacing seasonButton'></span>
					<span className='seasonButton align-vertical-center'>
						Seasons
					</span>
					<span className='button-spacing seasonButton button-symbol'>
					{
						this.state.seasonNavHidden ? downSymbol : upSymbol
					}
					</span>
				</button>
				{
					!this.state.seasonNavHidden && (
						<div className='dropdown-group'>
							<Link className='button--nav' to='/seasons' activeClassName='is-active'>Seasons Page</Link>
							<Link className='button--nav' to='/add-season'>Add Season</Link>
						</div>
					)
				}
			</div>
		);

		// Add dropdown and Help pages button
		// TODO: Create help page?
		const helpButtons = (
			<div>
				<button className='button'>Help</button>
				<Link className='button--nav' to='/help' activeClassName='is-active'>Help Page </Link>
			</div>
		);

		// TODO: Create columns for each button group
		const navButtons = (
			<div className='header__content nav'>
				<div>{ recordButtons }</div>
				<div>{ memberButtons }</div>
				<div>{ seasonButtons }</div>
			</div>
		);

		return(
			<div>
				<div className='nav header__content-center'>
					<button id='navButton' onClick={this.onClick} className='hamburger'>☰</button>
				</div>
				<div className='header__content nav'>
					{
						!this.state.navHidden && navButtons
					}
				</div>
			</div>
		)
	}
}

export default Navbar;