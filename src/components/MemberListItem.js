import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class MemberListItem extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			expand: false
		}

		this.handleClick = this.handleClick.bind( this );
	}

	handleClick()
	{
		this.setState({expand: !this.state.expand})
	}

	render()
	{
		const nickname = this.props.nickname ? `'${this.props.nickname}'` : '';
		const header = (
			<h3 className='list-item__title'>
				{`${this.props.firstName} ${nickname} ${this.props.surname}`}
			</h3>
		);

		const expandedComponent = (
			<div>
				<div className='list-item__row'>
					<div className='list-item__expanded-data--column'>
						<span>
							Full Name: <span className='bold-font'>{`${this.props.firstName} ${this.props.middleNames} ${this.props.surname}`}</span>
						</span>
						<span>
							Nick Name: <span className='bold-font'>{this.props.nickname}</span>
						</span>
					</div>

				</div>
				<div className='list-item__row'>
					<Link
						className='button list-item__align-left' 
						to={`/edit-member/${this.props.playerUuid}`}
					>
						Edit Member
					</Link>
				</div>
			</div>
		);

		return (
			<div className='list-item' onClick={this.handleClick}>
				<div>
				{
					header
				}
				</div>
				{
					this.state.expand && expandedComponent
				}
			</div>
		);
	}
}

export default MemberListItem;