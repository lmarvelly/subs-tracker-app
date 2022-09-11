import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class RecordForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			id: props.record ? props.record.id : '',
			playerUuid: props.record ? props.record.playerUuid : '',
			seasonUuid: props.record ? props.record.seasonUuid : '',
			recordType: props.record ? props.record.recordType : 'PAYMENT',
			sessionName: props.record ? props.record.sessionName : '',
			note: props.record ? props.record.note : '',
			createdAt: props.record ? moment( props.record.createdAt ) : moment(),
			calenderFocused: false,
			
			error: '',
			// amountError: '', TODO: Remove?

			amount: props.record ? props.record.amount / 100 : ''
		};
	}

	// Clears error, if everything is fine, and returns true or false
	isFormFalsy = () =>
	{
		const isFalsy = (
			!this.state.sessionName ||  
			!this.state.playerUuid || 
			!this.state.seasonUuid
		);

		return isFalsy;
	}
	onSeasonNameChange = ( e ) => {
		const seasonUuid = e.target.value;

		this.setState( () => ({ seasonUuid }) );
	}
	onNameChange = ( e ) => {
		const playerUuid = e.target.value;
		this.setState( () => ({ playerUuid }) );
	};
	onTypeChange = ( e ) => {
		const recordType = e.target.value;
		this.setState( () => ({ recordType }) );
	};
	onSessionNameChange = ( e ) => {
		const sessionName = e.target.value;
		if ( sessionName.length <= 30 ) 
		{
			this.setState( () => ({ sessionName }) );
		}
	};
	onNoteChange = ( e ) => {
		const note = e.target.value;
		if ( note.length <= 50 ) 
		{
			this.setState( () => ({ note }) );
		}
	};
	setAmount = ( amount ) => {
		if( !amount || ( amount != 0 && amount <= 1000000))
		{
			this.setState( { amount } );
		}
	}
	onAmountChange = ( e ) => 
	{
		const amount = e.target.value;

		// The amount is not able to be deleted if we do not include this OR statement. We also have the regular expression to prevent the wrong input being entered
		if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			// Don't want message showing for 'Amount paid'
			if ( amount == 0 ) 
			{
				this.setState(() => ({ amountError: 'Amount cannot be zero'}));
				
				this.setState(() => ({amount}));
			}
			else if (amount > 1000000)
			{
				this.setState(() => ({amountError: 'Amount cannot be more than 1 million'}));
			}
			else
			{
				this.setState(() => ({amountError: ''}));
			}
			this.setAmount(amount);
		}
	};
	onDateChange = ( createdAt ) => {
		if(createdAt) // prevents the user from deleting the date.
		{
			this.setState( () => ({ createdAt }) );
		}
	};
	onFocusChange = ( { focused } ) => {
		this.setState( () => ({ calenderFocused: focused }) );
	};

	onSubmit = ( e ) => {
		e.preventDefault();

		const recordProperties = 
		{
			id: this.state.id,
			recordType: this.state.recordType,
			playerUuid: this.state.playerUuid,
			seasonUuid: this.state.seasonUuid,
			sessionName: this.state.sessionName,
			createdAt: this.state.createdAt.valueOf(),
			note: this.state.note
		}

		let sessionNameExists = false;

		// If sessionNames doesn't exist forEach loop wont run to avoid errors
		this.props.sessionNames && this.props.sessionNames.forEach((sessionName) =>
		{
			if (sessionName.sessionName === this.state.sessionName) 
			{
				sessionNameExists = true;
			}
		})

		if (!sessionNameExists) 
		{
			confirm(`Do you want to add '${this.state.sessionName}' to your default session names?`)
			{
				this.props.addSessionName({sessionName: this.state.sessionName});
			}
		}

		const record = 
		{ 
			...recordProperties, 
			amount: parseFloat(this.state.amount, 10) * 100 // Converting amount into a non decimal number
		}

		if ( this.isFormFalsy() )
		{
			this.setState( () => ({ error: 'Please check details' }) );
		}
		else
		{
			this.setState( () => ({ error: '' }) );

			this.props.onSubmit( record );
		}
	};

	render()
	{	
		const moneyInput = (amountErrorClassName) =>
		{
			return(
				<div>
					{ showPaymentErrorMessage && <p className='form__error'>Please enter an Amount</p>}
					<input
						id='amount'
						className={`text-input${amountErrorClassName}`}
						type="text"
						placeholder="Please enter an amount"
						value={ this.state.amount }
						onChange={ this.onAmountChange }
					/>
				</div>
			)
		}
		const error = '__error';
		const seasonErrorClassName = this.state.seasonUuid ? '' : error;
		const memberErrorClassName = this.state.playerUuid ? '' : error;
		const sessionNameErrorClassName = this.state.sessionName ? '' : error;
		const amountErrorClassName = this.state.amount ? '' : error;
		// div around Submit button stops it from being directly styled by the form
		const isFalsy = this.isFormFalsy();

		const ifPaymentRecord = ((!!(this.state.error && amountErrorClassName) || !this.state.amount));
		const ifNoRecord = (this.state.error && amountErrorClassName);

		const showPaymentErrorMessage = this.props.record ? ifPaymentRecord : ifNoRecord;

		return(
			<div>
				<form className='form' onSubmit={ this.onSubmit }>
					{this.state.error && seasonErrorClassName && <p className='form__error'>Please select a Season</p>}
					<select
						id='seasonName'
						className={`select${seasonErrorClassName}`}
						onChange={ this.onSeasonNameChange }
						value={ this.state.seasonUuid }
					>
						<option hidden>Select a Season</option>
						{
							this.props.seasons.map( (season) =>
							{
								return (
									<option
										key={season.seasonUuid}
										value={season.seasonUuid}
									>
										{`${season.seasonName}`}
									</option>
								)
							})
						}
					</select>
					{this.state.error && memberErrorClassName && <p className='form__error'>Please select a Member</p>}
					<select 
						id='playerName'
						className={`select${memberErrorClassName}`}
						onChange={ this.onNameChange }
						value={ this.state.playerUuid }
					>
						<option hidden >Select a Member</option>
						{
							this.props.members.map( ( member ) => 
							{
								return (
									<option 
										key={member.playerUuid} 
										value={member.playerUuid}
									>
										{`${member.firstName} ${member.middleNames} ${member.surname}`}
									</option>
								)
							})
						}
					</select>
					<select
						id='paymentType'
						className='select'
						onChange={ this.onTypeChange }
						value={ this.state.recordType }
					>
						<option 
							value="PAYMENT"
						>
							New Payment
						</option>
						<option 
							value="DEBT"
						>
							Add Debt
						</option>
					</select>
					{this.state.error && sessionNameErrorClassName && <p className='form__error'>Please provide a sessionName</p>}
					<input 
						id='sessionName'
						className={`text-input${sessionNameErrorClassName}`}
						type="text"
						placeholder="Provide a Session Name"
						value={ this.state.sessionName }
						onChange={ this.onSessionNameChange }
						list='sessionList'
					/>
					{
						this.props.sessionNames &&
						<datalist id='sessionList'>
						{
							this.props.sessionNames.map((sessionName) =>
							{
								return (
									<option key={sessionName.sessionUuid}>{sessionName.sessionName}</option>
								);
							})
						}
						</datalist>
					}
					
					{this.state.amountError && <p className='form__error'>{this.state.amountError}</p>}
					{
						moneyInput(amountErrorClassName)
					}
					
					<SingleDatePicker
						date={ this.state.createdAt }
						onDateChange={ this.onDateChange }
						focused={ this.state.calenderFocused }
						onFocusChange={ this.onFocusChange }
						numberOfMonths={1}
						isOutsideRange={ () => false }
						displayFormat="DD/MM/YYYY"
					/>
					<textarea
						className='textarea'
						placeholder="Add a note e.g. 'To be paid by 01/01/23' (optional)"
						onChange={ this.onNoteChange }
						value={this.state.note}
					>
					</textarea>
					{(this.state.error && isFalsy ) && <p className='form__error'>{this.state.error}</p>}
					<div>
						<button className='button'>
							{this.props.record ? 'Save Changes' : 'Add Payment Record'}
						</button>
					</div>
				</form> 
			</div>
		);
	}
}