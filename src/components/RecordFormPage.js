import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class RecordFormPage extends Component
{
	componentDidMount(){
		this.setState({ playerId: document.getElementById('playerName').value  });
	};
	state = 
	{
		playerId: '',
		recordType: 'payment',
		description: '',
		note: '',
		amount: '',
		createdAt: moment(),
		calenderFocused: false,
		error: ''
	};
	onNameChange = ( e ) => {
		console.log(document.getElementById('playerName').value);
		const playerId = e.target.value;
		this.setState( () => ({ playerId }) );
	};
	onTypeChange = ( e ) => {
		// @todo 
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

		if ( !this.state.description || !this.state.amount || !this.state.playerId )
		{
			this.setState( () => ({ error: 'Please provide description and amount' }) );
		}
		else
		{
			this.setState( () => ({ error: '' }) );
			this.props.onSubmit(
			{
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100, // Converting amount into a non decimal number
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			});
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
						<option value="123">Luke</option>
						<option value="1234">Jason</option>
						<option value="12345">Harry</option>
					</select>
					<select onChange={ this.onTypeChange }>
						<option value="payment">New Payment</option>
						<option value="debt">Add Debt</option>
					</select>
					<input 
						type="text"
						placeholder="Description"
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