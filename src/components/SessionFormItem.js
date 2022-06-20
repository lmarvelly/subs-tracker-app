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
		this.setState({ attending: !this.state.attending })
		this.props.onAddItem({ type: 'DEBT', playerUuid: this.props.playerUuid })
	}

	onPaid = (e) =>
	{
		if(e.target.checked)
		{
			this.props.onAddItem({ type: 'PAYMENT', playerUuid: this.props.playerUuid });
		}
		else
		{
			this.props.onAddItem({ type: 'DEBT', playerUuid: this.props.playerUuid })
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
							name='attended'
							type="checkbox"
							onChange={this.onAttend}
						/>
					</div>
					<div className='form__session-col-checkbox'>
						<input
							disabled={!this.state.attending}
							value={this.props.playerUuid} 
							type="checkbox" 
							onChange={this.onPaid}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default SessionFormItem;