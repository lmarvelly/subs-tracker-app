import React from 'react';
import { connect } from 'react-redux';

import RecordForm from './RecordForm';
import { editRecord, removeRecord } from '../actions/records';

const EditRecordPage = ( props ) => 
{
	const deleteButton = <button onClick = 
	{
		(e) =>
		{
			confirm('Are you sure you want to remove record?') &&
			props.dispatch( removeRecord( { id: props.record.id } ) );
			props.history.push('/'); // return to dashboard
		}
	}
	>
		Delete
	</button>

	return (
		<div>
			<RecordForm
				record={ props.record }
				members={ props.members }
				onSubmit={ ( record ) => {
					switch (record.recordType) {
						case 'PAYMENT':
							props.dispatch(
								editRecord( 
									record.id,
									record
								)
							);
							break;
					
						case 'DEBT':
							console.log( 'DEBT', record );
							// INSERT EDIT DEBT CODE
							break;
					
						default:
							break;
					}

					props.history.push('/'); // return to dashboard
				}}
			/>
			{deleteButton}
		</div>
	)
};

// Give the component the current record object. We can take the props from the HOC and add to them
// This goes out of sync atm if you refresh the page because a new id gets generated for the record
const mapStateToProps = ( state, props ) =>
{ 
	return {
		members: state.members,
		record: state.paymentRecord.find( ( record ) => record.id === props.match.params.id)
	}
};

// The HOC passes the props through
export default connect( mapStateToProps )( EditRecordPage );