import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

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

	componentDidMount(){
		this.setState({ playerUuid: document.getElementById('playerName').value  });
	};
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
		this.setState( () => ({ recordType }) )
	};
	onDescriptionChange = ( e ) => {
		const description = e.target.value;
		this.setState( () => ({ description }) )
	};
	onNoteChange = ( e ) => {
		const note = e.target.value;
		this.setState( () => ({ note }) )
	};
	onAmountChange = ( e ) => {
		const amount = e.target.value;

		// The amount is not able to be deleted if we do not include this OR statement. We also have the regular expression to prevent the wrong input being entered
		if( !amount || amount.match(/^\d{1,}(\.\d{0,2})?$/) )
		{
			switch (e.target.id) {
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

		if ( !this.state.description || !(this.state.amount || this.state.amountOwed) || !this.state.playerUuid )
		{
			this.setState( () => ({ error: 'Please provide name, description and amount' }) );
		}
		else
		{
			this.setState( () => ({ error: '' }) );

			this.props.onSubmit( record() );
		}
	};

	render(){
		const moneyInput = () =>
		{
			if (this.state.recordType === 'PAYMENT') 
			{
				return(
					<div>
						<label htmlFor="amountToPay">Amount to Pay</label>
						<input
							id='amountToPay'
							type="text"
							placeholder="Amount"
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
						<label htmlFor="amountInDebt">Debt Amount</label>
						<input
							id='amountInDebt'
							type="text"
							placeholder="Debt Amount"
							value={ this.state.amountOwed }
							onChange={ this.onAmountChange }
						/>
						<label htmlFor="amountPayed">Amount payed</label>
						<input
							id='amountPayed'
							type="text"
							placeholder="Debt Amount"
							value={ this.state.amountPaid }
							onChange={ this.onAmountChange }
						/>
					</div>
				)
			}
		}
		return(
			<div>
				<form onSubmit={ this.onSubmit }>
					{
						this.state.error && <p>{this.state.error}</p>
					}
					<select
						id='seasonName'
						onChange={ this.onSeasonNameChange }
						value={ this.state.seasonUuid }
					>
						<option hidden>Please Select Season</option>
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
					<select 
						id='playerName'
						onChange={ this.onNameChange }
						value={ this.state.playerUuid }
					>
						<option hidden >Please Select Member</option>
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
					<input 
						type="text"
						placeholder="Description"
						value= { this.state.description }
						onChange={ this.onDescriptionChange }
					/>
					<br />
					{
						moneyInput()
					}
					
					<br />
					<SingleDatePicker
						date={ this.state.createdAt }
						onDateChange={ this.onDateChange }
						focused={ this.state.calenderFocused }
						onFocusChange={ this.onFocusChange }
						numberOfMonths={1}
						isOutsideRange={ () => false }
					/>
					<textarea
						placeholder="Add a note e.g. 'To be paid by 01/01/23' (optional)"
						onChange={ this.onNoteChange }
					>
					</textarea>
					<button>Add Payment Record</button>
				</form> 
			</div>
		);
	}
}