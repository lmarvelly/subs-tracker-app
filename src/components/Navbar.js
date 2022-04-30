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
		switch (e.target.id) 
		{
			case 'navButton': 
				this.setState({navHidden: !this.state.navHidden});
				break;
			case 'recordButton':
				this.setState({ recordNavHidden: !this.state.recordNavHidden });
				break;
			case 'memberButton':
				this.setState({ memberNavHidden: !this.state.memberNavHidden });
				break;
			case 'seasonButton':
				this.setState({ seasonNavHidden: !this.state.seasonNavHidden });
				break;
			default:
				break;
		}
	}

	isNavShowing = () =>
	{
		this.setState({navHidden: !this.state.navHidden});
	}

	render()
	{
		const recordButtons = (
			<div>
				<button id='recordButton' className='button' onClick={this.onClick}>
					Records
				</button>
				{
					!this.state.recordNavHidden && (
						<div className='dropdown-group'>
							<Link className='button button--nav' to='/dashboard' activeClassName='is-active'>Record Dashboard</Link>
							<Link className='button' to='/add-record'>Add Record</Link>
						</div>
					)
				}
				
			</div>
		);

		// TODO: Add dropdown and New Member button
		const memberButtons = (
			<div>
				<button
					id='memberButton'
					onClick={this.onClick} 
					className='button'
				>
					Members
				</button>
				{
					!this.state.memberNavHidden && (
						<div className='dropdown-group'>
							<Link className='button button--nav' to='/members' activeClassName='is-active'>Members Page </Link>
							<Link className='button' to='/add-member'>Add Member</Link>
						</div>
					)
				}
				
			</div>
		);

		// TODO: Add dropdown and New Season button
		const seasonButtons = (
			<div>
				<button
					id='seasonButton'
					className='button'
					onClick={this.onClick}
				>
					Seasons
				</button>
				{
					!this.state.seasonNavHidden && (
						<div className='dropdown-group'>
							<Link className='button button--nav' to='/seasons' activeClassName='is-active'>Seasons Page</Link>
							<Link className='button' to='/add-season'>Add Season</Link>
						</div>
					)
				}
			</div>
		);

		// Add dropdown and Help pages button
		const helpButtons = (
			<div>
				<button className='button'>Help</button>
				<Link className='button button--nav' to='/help' activeClassName='is-active'>Help Page </Link>
			</div>
		);

		const navButtons = (
			<div className='header__content header__nav'>
				{ recordButtons }
				{ memberButtons }
				{ seasonButtons }
			</div>
		);

		return(
			<div>
				<div className='header__content header__nav'>
					<button id='navButton' onClick={this.onClick} className='hamburger'>☰</button>
				</div>
				<div className='header__content header__nav'>
					{
						!this.state.navHidden && navButtons
					}
				</div>
			</div>
		)
	}
}

export default Navbar;