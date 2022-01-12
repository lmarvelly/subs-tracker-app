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
			playerUuid: props.record ? props.record.playerUuid : '',
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
			this.setState( () => ({ amount }) );
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

		const record = () => {
			if( this.state.recordType === 'DEBT' )
			{
				return (
				{
					playerUuid: this.state.playerUuid,
					description: this.state.description,
					createdAt: this.state.createdAt.valueOf(),
					note: this.state.note,
					recordType: 'DEBT',
					amountOwed: parseFloat(this.state.amount, 10) * 100, // Converting amount into a non decimal number
					amountPaid: 0
				});
			}
			else if( this.state.recordType === 'PAYMENT' )
			{
				return (
				{
					playerUuid: this.state.playerUuid,
					description: this.state.description,
					createdAt: this.state.createdAt.valueOf(),
					note: this.state.note,
					recordType: 'PAYMENT',
					amount: parseFloat(this.state.amount, 10) * 100, // Converting amount into a non decimal number
				})
			}
		}

		if ( !this.state.description || !this.state.amount || !this.state.playerUuid )
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
		return(
			<div>
				{
					this.state.error && <p>{this.state.error}</p>
				}
				<form onSubmit={this.onSubmit}>
					<select 
						id='playerName'
						onChange={ this.onNameChange }
					>
						<option defaultValue hidden value="">Please Select</option>
						{
							this.props.members.map( ( member ) => 
							{
								
								const selected = this.props.record ? ( member.playerUuid === this.props.record.playerUuid ) : false;
								
								return <option 
									key={member.playerUuid} 
									value={member.playerUuid}
									selected={selected}
								>
									{member.name}
								</option>
							})
						}
					</select>
					<select onChange={ this.onTypeChange }>
						<option value="PAYMENT">New Payment</option>
						<option value="DEBT">Add Debt</option>
					</select>
					<input 
						type="text"
						placeholder="Description"
						value= { this.state.description }
						onChange={ this.onDescriptionChange }
					/>
					<input
						type="text"
						placeholder="Amount"
						value={ this.state.amount }
						onChange={ this.onAmountChange }
					/>
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