import React, { Component } from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

export default class RecordFormPage extends Component
{
	state = 
	{
		description: '',
		note: '',
		amount: '',
		createdAt: moment(),
		calenderFocused: false
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

		if( amount.match(/^\d*(\.\d{0,2})?$/) )
		{
			this.setState( () => ({ amount }) );
		}
	};
	onDateChange = ( createdAt ) => {
		this.setState( () => ({ createdAt }) )
	};
	onFocusChange = ( { focused } ) => {
		this.setState( () => ({ calenderFocused: focused }) );
	};

	render(){
		return(
			<div>
				<form>
					<select>
						<option value="123">Luke</option>
						<option value="1234">Jason</option>
						<option value="12345">Harry</option>
					</select>
					<input 
						type="text"
						placeholder="Description"
						autoFocus
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