import React, { Component } from 'react';

export class SessionFormItem extends Component
{
	constructor( props )
	{
		super( props );

		this.state =
		{
			attending: false,
			paid: false,
		}
	}

	onAttend = (e) =>
	{
		this.setState({ attending: !this.state.attending });
		this.setState({ paid: false });

		if(e.target.checked)
		{
			this.props.addItem({ type: 'DEBT', playerUuid: this.props.playerUuid });
		}
		else
		{
			this.props.removeItem( this.props.playerUuid );
		}
	}

	onPaid = (e) =>
	{
		this.setState({ paid: !this.state.paid });
		if(e.target.checked)
		{
			this.props.addItem({ type: 'PAYMENT', playerUuid: this.props.playerUuid });
		}
		else
		{
			this.props.addItem({ type: 'DEBT', playerUuid: this.props.playerUuid })
		}
	}

	render()
	{
		return(
			<div>
				<div className='form__session-item'>
					<div className='form__session-col-name'>
						<span>{`${this.props.firstName} ${this.props.surname}`}</span>
					</div>
					<div className='form__session-col-checkbox'>
						<input 
							value={this.props.playerUuid} 
							type="checkbox"
							onChange={this.onAttend}
						/>
					</div>
					<div className='form__session-col-checkbox'>
						<input
							disabled={!this.state.attending}
							value={this.props.playerUuid} 
							type="checkbox"
							checked={this.state.paid}
							onChange={this.onPaid}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default SessionFormItem;