import React from 'react';
import { connect } from 'react-redux';
import RecordForm from './RecordForm';

const EditRecordPage = ( props ) => 
{
	return (
		<RecordForm
			record={ props.record }
			onSubmit={ ( record ) => {
				console.log( 'Updated', record );
			}}
		/>
	)
};

// Give the component the current record object. We can take the props from the HOC and add to them
// This goes out of sync atm if you refresh the page because a new id gets generated for the record
const mapStateToProps = ( state, props ) =>
{ 
	return {
		record: state.paymentRecord.find( ( record ) => record.id === props.match.params.id)
	}
};

// The HOC passes the props through
export default connect( mapStateToProps )( EditRecordPage );