import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class SeasonListItem extends Component
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
		this.setState({expand: !this.state.expand});
	}

	render()
	{
		const alternateClass = this.state.expand ? '' : '--light';

		return(
			<div className='list-item' onClick={this.handleClick}>
				<div className='list-item__row'>
					<h3 className={`list-item__title${alternateClass}`}>
						{this.props.seasonName}
					</h3>
					{
						this.state.expand && (
							<Link
								className='button list-item__align-center margin-top-medium--mobile' 
								to={`/edit-season/${this.props.seasonUuid}`}
							>
								Edit Season
							</Link>
						)
					}
				</div>
			</div>
		);
	}
}

export default SeasonListItem;