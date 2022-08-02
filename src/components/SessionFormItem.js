import React, { Component } from 'react';

export class SessionFormItem extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			attending: false,
			expand: false,
			discount: 0
		}
	}

	onAttend = (e) =>
	{
		this.setState({ attending: !this.state.attending });
		this.setState({ paid: false });

		if(e.target.checked)
		{
			this.props.addItem(
			{
				playerUuid: this.props.playerUuid, 
				discount: this.state.discount
			});
		}
		else
		{
			this.props.removeItem( this.props.playerUuid );
		}
	}

	onDiscountChange = ( e ) =>
	{
		this.setState({ discount: e.target.value });
	}

	handleExpand = ( e ) =>
	{
		if (e.target.className === 'list-item--session__row') 
		{
			this.setState({expand: !this.state.expand});
		}
	}

	render()
	{
		return(
			<div>
				<div className='list-item' onClick={this.handleExpand}>
					<div className='list-item--session__row'>
						<div style={{width: '50%'}}>
							<span>{`${this.props.firstName} ${this.props.surname}`}</span>
						</div>
						<div>
							<input 
								value={this.props.playerUuid} 
								type="checkbox"
								onChange={this.onAttend}
							/>
						</div>
					</div>
					{
						this.state.expand &&
						(
							<div className='list-item--session__row'>
								<span>Discount (%)</span>
								<input
									disabled={!this.state.attending}
									value={this.props.discount}
									placeholder='0'
									type="text"
									onChange={this.onDiscountChange}
								/>
							</div>
						)
					}
				</div>
			</div>
		);
	}
}

export default SessionFormItem;