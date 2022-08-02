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

		if(e.target.checked)
		{
			this.props.addPlayer(
			{
				playerUuid: this.props.playerUuid, 
				discount: parseFloat(this.state.discount, 10) * 100
			});
		}
		else
		{
			this.props.removePlayer( this.props.playerUuid );
		}
	}

	onDiscountChange = ( e ) =>
	{
		const discount = parseFloat(e.target.value, 10);
		
		if( !discount || discount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			if (discount === NaN)
			{
				this.setState({ discount: '' });
			}
			else if(discount <= 100 && discount >= 0)
			{
				this.setState({ discount });

				this.props.updatePlayer(
				{
					playerUuid: this.props.playerUuid, 
					discount
				});
			}
		}
	}

	handleExpand = ( e ) =>
	{
		this.setState({expand: !this.state.expand});
	}

	noExpand = (e) =>
	{
		e.stopPropagation();
	}

	render()
	{
		return(
			<div>
				<div className='list-item expand' onClick={this.handleExpand}>
					<div className='list-item--session__row expand'>
						<div className='expand' style={{width: '50%'}}>
							<span>{`${this.props.firstName} ${this.props.surname}`}</span>
						</div>
						<div>
							<input 
								value={this.props.playerUuid} 
								type="checkbox"
								onChange={this.onAttend}
								onClick={this.noExpand}
							/>
						</div>
					</div>
					{
						this.state.expand &&
						(
							<div className='list-item--session__row expand'>
								<span>Discount (%)</span>
								<input
									disabled={!this.state.attending}
									value={this.state.discount}
									placeholder='0'
									type="text"
									onChange={this.onDiscountChange}
									onClick={this.noExpand}
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