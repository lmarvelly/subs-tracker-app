import React, { Component } from 'react';

export class SessionFormItem extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			attending: props.attending ? true : false,
			expand: false,
			discount: props.discount ? props.discount : '',
			activeClassname: ''
		}
	}

	onAttend = (e) =>
	{
		this.setState({ attending: !this.state.attending });

		if(e.target.checked)
		{
			this.setState({activeClassname: '--active'});
			this.props.addPlayer(
			{
				playerUuid: this.props.playerUuid, 
				discount: parseFloat(this.state.discount, 10) * 100
			});
		}
		else
		{
			this.setState({activeClassname: ''});
			this.props.removePlayer( this.props.playerUuid );
		}
	}

	onDiscountChange = ( e ) =>
	{
		const value = e.target.value;
		if( !value || value.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			const discount = parseFloat(e.target.value, 10);
			if (discount === NaN || !discount)
			{
				this.setState({ discount: '' });
			}
			else if(discount <= 100 && discount > 0)
			{
				this.setState({ discount });
			}
			
			this.props.updatePlayer(
			{
				playerUuid: this.props.playerUuid, 
				discount
			});
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
				<div className={`list-item${this.state.activeClassname} expand`} onClick={this.handleExpand}>
					<div className='list-item--session__row expand'>
						<div className='expand width-50'>
							<span>{`${this.props.firstName} ${this.props.surname}`}</span>
						</div>
						<div>
							<input
								className='list-item--session__checkbox'
								value={this.props.playerUuid}
								checked={this.state.attending}
								type="checkbox"
								onChange={this.onAttend}
								onClick={this.noExpand}
							/>
						</div>
					</div>
					{
						this.state.expand &&
						(
							<div className='list-item--session__row expand margin-top-medium'>
								<span>Discount (%)</span>
								<input
									className='list-item--session__discount'
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