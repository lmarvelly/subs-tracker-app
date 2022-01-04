import React from 'react';
import { connect } from 'react-redux'; // To connect to the store
import { setTextFilter } from '../actions/filters';

/**
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
			value={ props.filters.text } 
			onChange={
				(e) => 
				{
					props.dispatch( setTextFilter( e.target.value ) );
					console.log(e.target.value);
				}
			}
		/>
	</div>
);

/**
 * @param {*} state 
 * @returns The filters attribute is passed down to the
 * RecordListFilters component
 */
const mapStateToProps = ( state ) => {
	return {
		filters: state.filters
	};
};

// connect()
export default connect( mapStateToProps )( RecordListFilters );