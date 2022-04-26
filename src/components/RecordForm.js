import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

export default class RecordForm extends Component
{
	constructor( props )
	{
		super( props );

		this.state = {
			id: props.record ? this.props.record.id : '',
			playerUuid: props.record ? props.record.playerUuid : '',
			seasonUuid: props.record ? props.record.seasonUuid : '',
			recordType: props.record ? props.record.recordType : 'PAYMENT',
			description: props.record ? props.record.description : '',
			note: props.record ? props.record.note : '',
			createdAt: props.record ? moment( props.record.createdAt ) : moment(),
			calenderFocused: false,
			
			error: '',

			amount: props.record ? props.record.amount / 100 : '',
			amountOwed: props.record ? props.record.amountOwed / 100 : '',
			amountPaid: props.record ? props.record.amountPaid / 100 : ''
		};
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
		if ( recordType === 'PAYMENT') 
		{
			this.setState( () => ({ amount: this.state.amountOwed}) );
		}
		if ( recordType === 'DEBT' ) 
		{
			this.setState( () => ({ amountOwed: this.state.amount}) );
		}
	};
	onDescriptionChange = ( e ) => {
		const description = e.target.value;
		if ( description.length <= 30 ) 
		{
			this.setState( () => ({ description }) );
		}
	};
	onNoteChange = ( e ) => {
		const note = e.target.value;
		if ( note.length <= 50 ) 
		{
			this.setState( () => ({ note }) );
		}
	};
	onAmountChange = ( e ) => {
		const amount = e.target.value;

		// The amount is not able to be deleted if we do not include this OR statement. We also have the regular expression to prevent the wrong input being entered
		if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			if(amount < 1000000)
			{
				switch (e.target.id) 
				{
					case 'amountToPay':
						this.setState( () => ({ amount }) );
						break;
					
					case 'amountInDebt':
						this.setState( () => ({ amountOwed: amount }) );
						break;
					
					case 'amountPayed':
						this.setState( () => ({ amountPaid: amount }) );
						break;
					
					default:
						break;
				}
			}
		}
	};
	onDateChange = ( createdAt ) => {
		if(createdAt) // prevents the user from deleting the date.
		{
			this.setState( () => ({ createdAt }) )
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
			playerUuid: this.state.playerUuid,
			seasonUuid: this.state.seasonUuid,
			description: this.state.description,
			createdAt: this.state.createdAt.valueOf(),
			note: this.state.note
		}

		const record = () => {
			if( this.state.recordType === 'DEBT' )
			{
				return (
				{
					...recordProperties,
					recordType: 'DEBT',
					amountOwed: parseFloat(this.state.amountOwed, 10) * 100, // Converting amount into a non decimal number
					amountPaid: parseFloat(this.state.amountPaid, 10) * 100
				});
			}
			else if( this.state.recordType === 'PAYMENT' )
			{
				return (
				{
					...recordProperties,
					recordType: 'PAYMENT',
					amount: parseFloat(this.state.amount, 10) * 100, // Converting amount into a non decimal number
				})
			}
		}

		if ( !this.state.description || !(this.state.amount || this.state.amountOwed) || !this.state.playerUuid || !this.state.seasonUuid )
		{
			this.setState( () => ({ error: 'Please check details' }) );
		}
		else if ( this.state.amountPaid > this.state.amountOwed) 
		{
			this.setState( () => ({ error: 'Amount Paid cannot be more than Amount Owed' }) );
		}
		else
		{
			this.setState( () => ({ error: '' }) );

			this.props.onSubmit( record() );
		}
	};

	render(){
		const moneyInput = (amountErrorClassName) =>
		{
			if (this.state.recordType === 'PAYMENT') 
			{
				return(
					<div>
						<input
							id='amountToPay'
							className={`text-input${amountErrorClassName}`}
							type="text"
							placeholder="How much was Paid?"
							value={ this.state.amount }
							onChange={ this.onAmountChange }
						/>
					</div>
				)
			}
			else if (this.state.recordType === 'DEBT')
			{
				return(
					<div>
						<input
							id='amountInDebt'
							className={`text-input${amountErrorClassName}`}
							type="text"
							placeholder="Total Debt Amount"
							value={ this.state.amountOwed }
							onChange={ this.onAmountChange }
						/>
						{
							this.props.record && (
								<input
									id='amountPayed'
									className='text-input'
									type="text"
									placeholder="Amount of Debt Paid"
									value={ this.state.amountPaid }
									onChange={ this.onAmountChange }
								/>
							)
						}
						
					</div>
				)
			}
		}
		const error = '--error';
		const seasonErrorClassName = this.state.seasonUuid ? '' : error;
		const memberErrorClassName = this.state.playerUuid ? '' : error;
		const descriptionErrorClassName = this.state.description ? '' : error;
		const amountErrorClassName = this.state.amount || this.state.amountOwed ? '' : error;
		// div around Submit button stops it from being directly styled by the form
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
					{this.state.error && descriptionErrorClassName && <p className='form__error'>Please provide a description</p>}
					<input 
						id='description'
						className={`text-input${descriptionErrorClassName}`}
						type="text"
						placeholder="Provide a Description"
						value={ this.state.description }
						onChange={ this.onDescriptionChange }
					/>
					
					{this.state.error && amountErrorClassName && <p className='form__error'>Please enter an Amount</p>}
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
					/>
					<textarea
						className='textarea'
						placeholder="Add a note e.g. 'To be paid by 01/01/23' (optional)"
						onChange={ this.onNoteChange }
						value={this.state.note}
					>
					</textarea>
					{this.state.error && <p className='form__error'>{this.state.error}</p>}
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