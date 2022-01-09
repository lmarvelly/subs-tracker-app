import React from 'react';
import { connect } from 'react-redux'; // To connect to the store
import { setTextFilter, sortByDateAscending, sortByDateDescending, sortByAmount } from '../actions/filters';

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
const RecordListFilters = ( props ) => (
	<div>
		<input 
			type="text" 
			value={ props.filters.text } // This is needed to make it a controlled component
			onChange=
			{
				(e) => 
				{
					props.dispatch( setTextFilter( e.target.value ) );
				}
			}
		/>
		<select 
			value={ props.filters.sortBy } // This is needed to make it a controlled component
			onChange=
			{
				(e) =>
				{
					switch (e.target.value) 
					{
						case 'dateAscending':
							props.dispatch( sortByDateAscending() );
							break;
					
						case 'dateDescending':
							props.dispatch( sortByDateDescending() );
							break;
					
						case 'amount':
							props.dispatch( sortByAmount() );
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
	</div>
);

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