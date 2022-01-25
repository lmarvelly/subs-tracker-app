import React, { Component } from 'react'
import { connect } from 'react-redux'; // To connect to the store
import { DateRangePicker } from 'react-dates'; 

import { setTextFilter, sortByDateAscending, sortByDateDescending, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

/**
 * Both inputs are Controlled Components (Input where the input is
 * controlled by JS)
 * 
 * @param {*} props the filters prop is passed down
 * 
 * @param {function} onChange is an On Change handler propery that 
 * takes in a function
 * 
 * @returns 
 */
class RecordListFilters extends Component
{
	state = 
	{
		calenderFocused: null
	}

	onDatesChange = ( { startDate, endDate } ) => {
		this.props.dispatch( setStartDate( startDate ) );
		this.props.dispatch( setEndDate( endDate ) );
	};

	onFocusChange = ( calenderFocused ) =>
	{
		this.setState(() => ({ calenderFocused }))
	}

	render()
	{	
		return(
			<div>
				<input 
					type="text" 
					value={ this.props.filters.text } // This is needed to make it a controlled component
					onChange=
					{
						(e) => 
						{
							this.props.dispatch( setTextFilter( e.target.value ) );
						}
					}
				/>
				<select 
					value={ this.props.filters.sortBy } // This is needed to make it a controlled component
					onChange=
					{
						(e) =>
						{
							switch (e.target.value) 
							{
								case 'dateAscending':
									this.props.dispatch( sortByDateAscending() );
									break;
							
								case 'dateDescending':
									this.props.dispatch( sortByDateDescending() );
									break;
							
								case 'amount':
									this.props.dispatch( sortByAmount() );
									break;
							
								default:
									break;
							}
						}
					}>
					<option value="dateAscending">Date Ascending</option>
					<option value="dateDescending">Date Descending</option>
					<option value="amount">Amount</option>
				</select>
				<DateRangePicker
					startDate={ this.props.filters.startDate }
					endDate={ this.props.filters.endDate }
					onDatesChange={ this.onDatesChange }
					focusedInput={ this.state.calenderFocused }
					onFocusChange={ this.onFocusChange }
					showClearDates={ true }
					numberOfMonths={ 1 }
					isOutsideRange={ () => false }
				/>
			</div>
		);
	}
}

/**
 * @param {*} state 
 * @returns The filters attribute is passed down to the
 * RecordListFilters component
 */
const mapStateToProps = ( state ) => 
{
	return {
		filters: state.filters
	};
};

// connect()
export default connect( mapStateToProps )( RecordListFilters );